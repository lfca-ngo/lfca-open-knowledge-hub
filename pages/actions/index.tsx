import { Divider, Form, Input, List } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useMemo } from 'react'

import { ActionCardWrapper } from '../../components/ActionCard'
import { ActionCardSkeleton } from '../../components/ActionCard/ActionCardSkeleton'
import {
  CategoryTreeForm,
  CategoryTreeFormItems,
} from '../../components/ActionsList/CategoryTreeForm'
import { FilterBar } from '../../components/FilterBar'
import { Hero } from '../../components/Hero'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import { SourcesCarousel } from '../../components/SourcesCarousel'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import {
  ContentfulActionFields,
  ContentfulSourceFields,
  fetchAllActions,
  fetchAllTemplates,
} from '../../services/contentful'
import { lowerCaseSearch } from '../../utils'

const { Search } = Input

export const LS_ACTION_LIST = 'actions_list'

interface DashboardProps {
  actions: ContentfulActionFields[]
  templates: ContentfulSourceFields[]
}

const Home: NextPage<DashboardProps> = ({ actions, templates }) => {
  const { persistentNavigation, resetPosition, savePosition } =
    usePersistentNavigation(true)

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { ...formOptions } = persistentNavigation
  const currentPage = persistentNavigation?.currentPage
  const [form] = Form.useForm()

  const handleChange = (
    latestChange: CategoryTreeFormItems,
    allValues: CategoryTreeFormItems
  ) => {
    savePosition({ ...persistentNavigation, ...allValues })
    // when searching, clear out all other filters
    if (latestChange?.search) {
      resetPosition()
      savePosition({ ...persistentNavigation, search: latestChange.search })
    } else {
      // for other operations, keep the state
      savePosition({ ...persistentNavigation, ...allValues })
    }
  }

  const filteredActions = useMemo(() => {
    const activeCategories = formOptions?.categories || []
    const activeSearch = formOptions?.search || ''
    const activeSorting = formOptions?.sorting
    const activeHasRelatedActions = formOptions?.hasRelatedActions

    return (
      actions
        // the below applies the search and category filter
        .filter((action) => {
          const hasRelatedActions = (action.relatedActions?.length || 0) > 0
          const shouldFilterRelatedActions = activeHasRelatedActions === 'yes'
          const actionCategories = (action.tags || []).map((c) => c.categoryId)
          const intersectingCategories = actionCategories.filter((value) =>
            activeCategories.includes(value)
          )

          const matchesRelatedActions =
            activeHasRelatedActions === 'all'
              ? true
              : shouldFilterRelatedActions
              ? hasRelatedActions
              : !hasRelatedActions
          const matchesCategory = intersectingCategories.length > 0
          const matchesSearch = lowerCaseSearch(
            activeSearch,
            action.title || ''
          )
          return matchesSearch && matchesCategory && matchesRelatedActions
        })
        // the below applies the sorting filter
        .sort((a, b) => {
          if (activeSorting === 'impact') {
            return b.impactValue - a.impactValue
          } else {
            return -1
          }
        })
    )
  }, [actions, formOptions])

  return (
    <TopNavLayout
      aside={
        <CategoryTreeForm
          form={form}
          initialValues={formOptions}
          mode={'default'}
          onValuesChange={handleChange}
        />
      }
      asidePosition="left"
      filterBar={
        <FilterBar
          filterItemsTags={[]}
          form={form}
          onValuesChange={handleChange}
        />
      }
      header={
        <Form form={form} onValuesChange={handleChange}>
          <Form.Item name="search">
            <Search
              placeholder="Search for climate action..."
              size="middle"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      }
      hero={
        <Hero
          subtitle={
            <>
              This open-source library is constantly updated and freely
              accessible to everyone. It offers a wealth of resources to help
              you make a difference — whether through personal action or by
              driving change as a team member within your company. Questions?{' '}
              <a href={`mailto:piotr@lfca.ngo`}>Drop us a line!</a>
            </>
          }
          title={'Open Sustainability Knowledge'}
        />
      }
    >
      <Main>
        <Section bordered={false} id="browse-actions">
          <Divider orientation="left" orientationMargin={0}>
            Templates
          </Divider>
          <div style={{ margin: '0 0 40px' }}>
            <SourcesCarousel sources={templates} />
          </div>

          <Divider orientation="left" orientationMargin={0}>
            How to guides
          </Divider>
          <List
            className="equal-height"
            dataSource={filteredActions}
            grid={{
              gutter: 24,
              lg: 2,
              md: 2,
              sm: 2,
              xl: 3,
              xs: 1,
              xxl: 4,
            }}
            pagination={{
              current: currentPage,
              defaultCurrent: currentPage,
              onChange: (page) =>
                persistentNavigation &&
                savePosition({
                  ...persistentNavigation,
                  currentPage: page,
                  scrollPosition: window.scrollY,
                }),
              pageSize: 20,
            }}
            renderItem={(item) => {
              return (
                <List.Item>
                  <ActionCardSkeleton fetching={false}>
                    <ActionCardWrapper
                      action={item}
                      onSavePosition={() => {
                        persistentNavigation &&
                          savePosition({
                            ...persistentNavigation,
                            scrollPosition: window.scrollY,
                          })
                      }}
                      {...{
                        renderAsLink: true,
                        unselectText: 'View',
                      }}
                    />
                  </ActionCardSkeleton>
                </List.Item>
              )
            }}
          />
        </Section>
      </Main>
    </TopNavLayout>
  )
}

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  const templates = await fetchAllTemplates()
  const actionsById = await fetchAllActions()
  const actions: ContentfulActionFields[] = Object.keys(actionsById).map(
    (id) => actionsById[id]
  )

  return {
    props: {
      actions,
      templates,
    },
  }
}

export default Home

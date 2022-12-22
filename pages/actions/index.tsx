import { Form, Input, List } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useMemo } from 'react'
import { ActionCardWrapper } from '../../components/ActionCard'
import { ActionCardSkeleton } from '../../components/ActionCard/ActionCardSkeleton'

import { ActionsList } from '../../components/ActionsList'
// import { ActionCardProps, ActionCardWrapper } from '../../components/ActionCard'
// import { ActionCardSkeleton } from '../../components/ActionCard/ActionCardSkeleton'
import {
  FilterBar,
  FilterFormItems,
} from '../../components/ActionsList/FilterBar'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'
import { lowerCaseSearch } from '../../utils'

export const LS_ACTION_LIST = 'actions_list'

interface DashboardProps {
  actions: ContentfulActionFields[]
}

const Home: NextPage<DashboardProps> = ({ actions }) => {
  const { persistentNavigation, resetPosition, savePosition } =
    usePersistentNavigation(true)

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { ...formOptions } = persistentNavigation
  const currentPage = persistentNavigation?.currentPage
  const [form] = Form.useForm()

  const handleChange = (
    latestChange: FilterFormItems,
    allValues: FilterFormItems
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

    return (
      actions
        // the below applies the search and category filter
        .filter((action) => {
          const actionCategories = action.tags.map((c) => c.categoryId)
          const intersectingCategories = actionCategories.filter((value) =>
            activeCategories.includes(value)
          )

          const matchesCategory = intersectingCategories.length > 0
          const matchesSearch = lowerCaseSearch(
            activeSearch,
            action.title || ''
          )
          return matchesSearch && matchesCategory
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
        <div>
          <FilterBar
            form={form}
            initialValues={formOptions}
            mode={'default'}
            onValuesChange={handleChange}
          />
        </div>
      }
      asidePosition="left"
      filterBar={<div>jo</div>}
      header={<Input style={{ width: '100px' }} placeholder="search" />}
    >
      <Main>
        <div style={{ margin: '20px 0 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px' }}>Browse our action modules</h1>
        </div>

        <Section bordered={false} id="browse-actions">
          <List
            className="no-padding"
            dataSource={filteredActions}
            grid={{
              gutter: 16,
              lg: 3,
              md: 3,
              sm: 2,
              xl: 3,
              xs: 1,
              xxl: 3,
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
              pageSize: 10,
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
                      // actionListItemProps={{
                      //   renderAsLink: true,
                      //   unselectText: 'View',
                      // }}
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
  const actionsById = await fetchAllActions()
  const actions: ContentfulActionFields[] = Object.keys(actionsById).map(
    (id) => actionsById[id]
  )

  return {
    props: {
      actions,
    },
  }
}

export default Home

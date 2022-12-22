import { EllipsisOutlined } from '@ant-design/icons'
import { Form, Input, List, Space } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useMemo } from 'react'

import { ActionCardWrapper } from '../../components/ActionCard'
import { ActionCardSkeleton } from '../../components/ActionCard/ActionCardSkeleton'
import {
  FilterBar,
  FilterFormItems,
  SORT_OPTIONS,
} from '../../components/ActionsList/FilterBar'
import { DropdownSelector } from '../../components/DropdownSelector'
import { Hero } from '../../components/Hero'
import { Main, Section, TopNavLayout } from '../../components/Layout'
import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'
import { lowerCaseSearch } from '../../utils'

const { Search } = Input

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
        <FilterBar
          form={form}
          initialValues={formOptions}
          mode={'default'}
          onValuesChange={handleChange}
        />
      }
      asidePosition="left"
      filterBar={
        <div>
          <Form layout="inline">
            <Space>
              <Form.Item name="sorting">
                <DropdownSelector
                  buttonContent={'Tags'}
                  buttonProps={{
                    icon: <EllipsisOutlined />,
                    size: 'small',
                    type: 'link',
                  }}
                  items={SORT_OPTIONS}
                  // onSelect={(key) => console.log(key)}
                />
              </Form.Item>
              <Form.Item name="sorting">
                <DropdownSelector
                  buttonContent={'Tags'}
                  buttonProps={{
                    icon: <EllipsisOutlined />,
                    size: 'small',
                    type: 'link',
                  }}
                  items={SORT_OPTIONS}
                  // onSelect={(key) => console.log(key)}
                />
              </Form.Item>
            </Space>
          </Form>
        </div>
      }
      header={
        <Form
        // onValuesChange={({ search }) => console.log(search)}
        >
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
          title={'Explore our actions'}
          subtitle={
            'Our action library is open and accessible to the public. If you have any questions, please reach out to us'
          }
        />
      }
    >
      <Main>
        <Section bordered={false} id="browse-actions">
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

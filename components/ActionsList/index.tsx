import { Divider, Form, List } from 'antd'
import React, { useMemo } from 'react'

import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import { ContentfulActionFields } from '../../services/contentful'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { ActionCardSkeleton } from '../ActionCard/ActionCardSkeleton'
import { FilterBar, FilterFormItems } from './FilterBar'
import styles from './styles.module.less'

export const LS_ACTION_LIST = 'actions_list'

export interface ActionListProps {
  actions: ContentfulActionFields[]
  actionListItemProps?: Omit<ActionCardProps, 'action'>
  fetching?: boolean
  mode?: 'default' | 'compact'
  pageSize?: number
}

export const ActionsList = ({
  actionListItemProps,
  actions,
  fetching,
  mode,
  pageSize = 10,
}: ActionListProps) => {
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
    <div className={styles['actions-list']}>
      <FilterBar
        form={form}
        initialValues={formOptions}
        mode={mode}
        onValuesChange={handleChange}
      />
      <Divider style={{ marginBottom: '20px' }} />
      <List
        className="no-padding"
        dataSource={filteredActions}
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
          pageSize: pageSize,
        }}
        renderItem={(item) => {
          return (
            <List.Item>
              <ActionCardSkeleton fetching={fetching}>
                <ActionCardWrapper
                  action={item}
                  onSavePosition={() => {
                    persistentNavigation &&
                      savePosition({
                        ...persistentNavigation,
                        scrollPosition: window.scrollY,
                      })
                  }}
                  {...actionListItemProps}
                />
              </ActionCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

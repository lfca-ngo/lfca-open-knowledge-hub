require('./styles.less')

import { Divider, Form, List } from 'antd'
import React, { useMemo } from 'react'

import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { ActionCardSkeleton } from '../ActionCard/ActionCardSkeleton'
import { FilterBar, FilterFormItems } from './FilterBar'

export const LS_ACTION_LIST = 'actions_list'

export interface ActionListProps {
  actions: CompanyActionListItemFragment[]
  actionListItemProps?: Omit<ActionCardProps, 'action'>
  fetching?: boolean
  hideCategoryTree?: boolean
}

export const ActionsList = ({
  actionListItemProps,
  actions,
  fetching,
  hideCategoryTree,
}: ActionListProps) => {
  const { persistentNavigation, resetPosition, savePosition } =
    usePersistentNavigation(true)

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { ...formOptions } = persistentNavigation
  const currentPage = persistentNavigation?.currentPage

  const [form] = Form.useForm()

  // called on every form item change
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

  // when a value in the form (LS) changes, we update
  // the list data by applying filter, search and sorting
  // by applying the actions directly on the list instead
  // of saving to a local list state we can prevent re-renders
  const filteredActions = useMemo(() => {
    const activeCategories = formOptions?.categories || []
    const activeSearch = formOptions?.search || ''
    const activeSorting = formOptions?.sorting

    return (
      actions
        // the below applies the search and category filter
        .filter((action) => {
          const actionCategories = action.categories.map((c) => c.id)
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
            return b?.companiesCompletedCount - a?.companiesCompletedCount
          }
        })
    )
  }, [actions, formOptions])

  return (
    <div className="actions-list">
      <FilterBar
        form={form}
        hideCategoryTree={hideCategoryTree}
        initialValues={formOptions}
        onValuesChange={handleChange}
      />
      <Divider />
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
          pageSize: 10,
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

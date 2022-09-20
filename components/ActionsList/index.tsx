require('./styles.less')

import { Divider, Form, List } from 'antd'
import React, { useMemo } from 'react'

import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import { CategoryTreeProps } from '../../services/contentful'
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
  categoryTrees?: CategoryTreeProps
}

export const ActionsList = ({
  actionListItemProps,
  actions,
  categoryTrees,
  fetching,
}: ActionListProps) => {
  // persist the scroll position, filters, search, sorting in LS to prevent
  // unnecessary rerenders (LS is available on initial render)
  const { options, savePosition } = usePersistentNavigation(
    LS_ACTION_LIST,
    true
  )

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { currentPage = 0, ...formOptions } = options || {}
  const [form] = Form.useForm()

  // called on every form item change
  const handleChange = (
    latestChange: FilterFormItems,
    allValues: FilterFormItems
  ) => {
    // when searching, clear out all other filters
    if (latestChange?.search) {
      savePosition({ ...options, search: latestChange.search })
    } else {
      // for other operations, keep the state
      savePosition({ ...options, ...allValues })
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
        categoryTrees={categoryTrees}
        form={form}
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
          onChange: (page) => savePosition({ ...options, currentPage: page }),
          pageSize: 10,
        }}
        renderItem={(item) => {
          return (
            <List.Item>
              <ActionCardSkeleton fetching={fetching}>
                <ActionCardWrapper
                  action={item}
                  onSavePosition={() => {
                    savePosition(options)
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

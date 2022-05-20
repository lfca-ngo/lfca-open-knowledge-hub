require('./styles.less')

import { Divider, Form, List, Skeleton } from 'antd'
import React, { useMemo } from 'react'

import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { FilterBar, SORT_OPTIONS } from './FilterBar'
import { FilterFormItems } from './FilterBar'

export const LS_ACTION_LIST = 'actions_list'

export interface ActionListProps {
  actionsByTags: Record<string, CompanyActionListItemFragment[]>
  actionListItemProps?: Omit<ActionCardProps, 'action'>
  fetching?: boolean
}

export const ActionsList = ({
  actionListItemProps,
  actionsByTags,
  fetching,
}: ActionListProps) => {
  // persist the scroll position, filters, search, sorting in LS to prevent
  // unnecessary rerenders (LS is available on initial render)
  const { options, savePosition } = useScrollPosition(LS_ACTION_LIST, true, {
    search: '',
    sorting: SORT_OPTIONS[0].key,
    tags: [ALL_ACTIONS_LABEL],
  })

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
      form.setFieldsValue({
        tags: [ALL_ACTIONS_LABEL],
      })
      savePosition({ search: latestChange.search })
    } else {
      // for other operations, keep the state
      savePosition({ ...options, ...allValues })
    }
  }

  // when a value in the form (LS) changes, we update
  // the list data by applying filter, search and sorting
  // by applying the actions directly on the list instead
  // of saving to a local list state we can prevent re-renders
  const actions = useMemo(() => {
    const [activeTag] = formOptions?.tags || []
    const activeSearch = formOptions?.search || ''
    const activeSorting = formOptions?.sorting
    // the below applies the tag filter
    const actions = actionsByTags[activeTag] || actionsByTags[ALL_ACTIONS_LABEL]

    return (
      actions
        // the below applies the search filter
        .filter((action) => {
          return lowerCaseSearch(activeSearch, action.title || '')
        })
        // the below applies the sorting filter
        .sort((a, b) => {
          if (activeSorting === 'impact') {
            return -1
            // @TODO once impactValue available via backend
            // return b.impactValue - a.impactValue
          } else {
            return b?.companiesCompletedCount - a?.companiesCompletedCount
          }
        })
    )
  }, [actionsByTags, formOptions])

  return (
    <div className="actions-list">
      <FilterBar
        form={form}
        initialValues={formOptions}
        onValuesChange={handleChange}
        tags={Object.keys(actionsByTags)}
      />
      <Divider />
      <List
        dataSource={actions}
        pagination={{
          current: currentPage,
          defaultCurrent: currentPage,
          onChange: (page) => savePosition({ ...options, currentPage: page }),
          pageSize: 10,
        }}
        renderItem={(item) => {
          return (
            <List.Item>
              <Skeleton
                active
                avatar={{ shape: 'square', size: 'large' }}
                loading={fetching}
                paragraph={{ rows: 1 }}
              >
                <ActionCardWrapper
                  action={item}
                  onSavePosition={() => {
                    savePosition(options)
                  }}
                  {...actionListItemProps}
                />
              </Skeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

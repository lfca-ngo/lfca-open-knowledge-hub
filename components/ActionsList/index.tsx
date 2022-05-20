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
  // we use the options of the hook to persist the search,
  // tags and current page while navigating
  const { options, savePosition } = useScrollPosition('ActionsList', true, {
    search: '',
    sorting: SORT_OPTIONS[0].key,
    tags: [ALL_ACTIONS_LABEL],
  })
  const { currentPage = 0, ...formOptions } = options || {}
  const [form] = Form.useForm()

  const handleChange = (
    latestChange: FilterFormItems,
    allValues: FilterFormItems
  ) => {
    // for the search, clear out all other filters
    if (latestChange?.search) {
      form.setFieldsValue({
        tags: [ALL_ACTIONS_LABEL],
      })
      savePosition({ search: latestChange.search })
    } else {
      // save the other filters, keep the state
      savePosition({ ...options, ...allValues })
    }
  }

  // when a value in the form (LS) changes, we update
  // the list data applying filter, search and sorting
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
            // return b.companiesCompletedCount - a.companiesCompletedCount
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

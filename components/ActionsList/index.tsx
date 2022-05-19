require('./styles.less')

import { Divider, List, Skeleton } from 'antd'
import React, { useMemo } from 'react'

import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { FilterBar } from './FilterBar'
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
  // Restore scroll and selectedTags between navigation
  const { options, savePosition } = useScrollPosition('ActionsList', true)

  // we use the options (LS) to persist the search,
  // tags and current page while navigating
  const [activeTag] = options?.tags || [ALL_ACTIONS_LABEL]
  const activePage = options?.currentPage || 0
  const activeSearch = options?.search || ''

  const handleChange = (_: FilterFormItems, allValues: FilterFormItems) => {
    savePosition({ ...options, tags: allValues.tags })
  }

  const handleSearch = (value: string) => {
    savePosition({ search: value })
  }

  const actions = useMemo(() => {
    return actionsByTags[activeTag].filter((action) => {
      return lowerCaseSearch(activeSearch, action.title || '')
    })
  }, [actionsByTags, activeTag, activeSearch])

  return (
    <div className="actions-list">
      <FilterBar
        initialValues={{ tags: [activeTag] }}
        onSearch={handleSearch}
        onValuesChange={handleChange}
        searchValue={activeSearch}
        tags={Object.keys(actionsByTags)}
      />
      <Divider />
      <List
        dataSource={actions}
        pagination={{
          current: activePage,
          defaultCurrent: activePage,
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

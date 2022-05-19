require('./styles.less')

import { Divider, Form, List, Skeleton } from 'antd'
import React, { useState } from 'react'

import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { arrayContains } from '../../utils'
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
  const { options, savePosition } = useScrollPosition(
    'ActionList_Dashboard',
    true
  )
  const actions = actionsByTags[ALL_ACTIONS_LABEL]
  const tags = Object.keys(actionsByTags)
  const [currentPage, setCurrentPage] = useState(options?.currentPage || 0)
  const [list, setList] = useState<CompanyActionListItemFragment[]>(actions)

  // form for filtering
  const [form] = Form.useForm()

  // filtering function
  const handleChange = (_: FilterFormItems, allValues: FilterFormItems) => {
    const { tags } = allValues

    const filtered = actions.filter((action) => {
      const tagsArray = action.tags?.map((tag) => tag.name || '')
      const isValid = arrayContains(tags, tagsArray)

      return isValid
    })
    setList(filtered)
  }

  // searches name and services
  const handleSearch = (value: string) => {
    const filtered = actions.filter((action) => {
      const actionTitle = action.title
      // find results regardless of case and completeness of search term
      return actionTitle?.toLowerCase().includes(value.toLowerCase()) || false
    })
    setList(filtered)
  }

  return (
    <div className="actions-list">
      <FilterBar
        form={form}
        initialValues={{ tags: [ALL_ACTIONS_LABEL] }}
        onSearch={handleSearch}
        onValuesChange={handleChange}
        tags={tags}
      />
      <Divider />
      <List
        dataSource={list}
        pagination={{
          current: currentPage,
          defaultCurrent: options?.currentPage || currentPage,
          onChange: (page) => setCurrentPage(page),
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
                    // console.log(form.getFieldsValue())
                    savePosition({ currentPage })
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

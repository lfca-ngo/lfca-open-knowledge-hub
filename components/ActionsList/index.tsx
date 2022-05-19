require('./styles.less')

import { Divider, Input, List, Select, Skeleton, Space } from 'antd'
import React, { useMemo, useState } from 'react'

import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'

const { Search } = Input

const SORT_OPTIONS = [
  { key: 'impact', label: 'Impact' },
  { key: 'popularity', label: 'Popularity' },
]

const SortOptions = () => {
  return (
    <Select placeholder="Please select">
      {SORT_OPTIONS.map((option: any) => (
        <Select.Option key={option.key}>{option.label}</Select.Option>
      ))}
    </Select>
  )
}

const ListFilters = ({
  selectedTags,
  setSelectedTags,
  tags,
}: {
  tags: string[]
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}) => {
  return (
    <div className="list-filters">
      <Select
        mode="multiple"
        onChange={setSelectedTags}
        placeholder="Please select"
        value={selectedTags}
      >
        {tags.map((tag) => (
          <Select.Option key={tag}>{tag}</Select.Option>
        ))}
      </Select>
      <Space>
        <SortOptions />
        <Search placeholder="Search..." />
      </Space>
    </div>
  )
}

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
  const [selectedTags, setSelectedTags] = useState<string[]>([
    ALL_ACTIONS_LABEL,
  ])
  const actions = actionsByTags[ALL_ACTIONS_LABEL]
  const tags = Object.keys(actionsByTags)

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      if (selectedTags.includes(ALL_ACTIONS_LABEL)) return true
      const tags = action.tags.map((a) => a.name)
      return selectedTags.some((tag) => tags.includes(tag))
    })
  }, [selectedTags, actions])

  return (
    <div className="actions-list">
      <ListFilters
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        tags={tags}
      />
      <Divider />
      <List
        dataSource={filteredActions}
        pagination={{ pageSize: 10 }}
        renderItem={(item) => {
          return (
            <List.Item>
              <Skeleton
                active
                avatar={{ shape: 'square', size: 'large' }}
                loading={fetching}
                paragraph={{ rows: 1 }}
              >
                <ActionCardWrapper {...actionListItemProps} action={item} />
              </Skeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

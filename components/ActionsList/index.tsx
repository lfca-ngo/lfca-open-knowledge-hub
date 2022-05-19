require('./styles.less')

import { Divider, Form, Input, List, Select, Skeleton, Space } from 'antd'
import React, { useMemo, useState } from 'react'

import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { DropdownSelect } from '../DropdownSelect'

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
      <Form
        initialValues={{ tags: selectedTags }}
        onValuesChange={(_, { tags }) => setSelectedTags(tags)}
      >
        <Form.Item name="tags">
          <DropdownSelect items={tags.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
      </Form>
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
  // Restore scroll and selectedTags between navigation
  const { options, savePosition } = useScrollPosition(
    'ActionList_Dashboard',
    true
  )
  const [currentPage, setCurrentPage] = useState(options?.currentPage || 0)

  const [selectedTags, setSelectedTags] = useState<string[]>(
    options?.selectedTags || [ALL_ACTIONS_LABEL]
  )
  const actions = actionsByTags[ALL_ACTIONS_LABEL]
  const tags = Object.keys(actionsByTags)

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      if (
        selectedTags.includes(ALL_ACTIONS_LABEL) ||
        selectedTags.length === 0
      ) {
        return true
      }

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
                  onSavePosition={() =>
                    savePosition({ currentPage, selectedTags })
                  }
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

require('./styles.less')

import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, List, Popover, Select, Space, Tabs } from 'antd'
import React from 'react'

import { ALL_ACTIONS } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'

const { TabPane } = Tabs
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

const ListActions = () => {
  return (
    <span>
      <Space>
        <Popover content={<SortOptions />}>
          <Button icon={<FilterOutlined />} />
        </Popover>
        <Popover content={<Search placeholder="Search..." />}>
          <Button icon={<SearchOutlined />} />
        </Popover>
      </Space>
    </span>
  )
}

export interface ActionListProps {
  actionsByTags: Record<string, CompanyActionListItemFragment[]>
  actionListItemProps?: Omit<ActionCardProps, 'action'>
}

export const ActionsList = ({
  actionListItemProps,
  actionsByTags,
}: ActionListProps) => {
  return (
    <Tabs
      className="actions-list-wrapper"
      defaultActiveKey={ALL_ACTIONS}
      tabBarExtraContent={{ right: <ListActions /> }}
    >
      {Object.keys(actionsByTags).map((tag) => {
        const actions = actionsByTags[tag]
        return (
          <TabPane key={tag} tab={tag}>
            <List
              className="actions-list"
              dataSource={actions}
              pagination={{ pageSize: 10 }}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <ActionCardWrapper {...actionListItemProps} action={item} />
                  </List.Item>
                )
              }}
            />
          </TabPane>
        )
      })}
    </Tabs>
  )
}

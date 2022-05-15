require('./styles.less')

import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, List, Popover, Select, Space, Tabs } from 'antd'
import React from 'react'

import { ALL_ACTIONS } from '../../services/contentful'
import { ActionCard } from '../ActionCard'

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

export const ActionsList = ({
  actionsByTags,
  onSelect,
}: {
  actionsByTags: any
  onSelect?: any
}) => {
  return (
    <Tabs
      className="actions-list-wrapper"
      defaultActiveKey={ALL_ACTIONS}
      tabBarExtraContent={{ right: <ListActions /> }}
    >
      {Object.keys(actionsByTags).map((tag: string) => {
        const actions = actionsByTags[tag]
        return (
          <TabPane key={tag} tab={tag}>
            <List
              className="actions-list"
              dataSource={actions}
              pagination={{ pageSize: 10 }}
              renderItem={(item: any) => {
                return (
                  <List.Item>
                    <ActionCard
                      action={item}
                      onClick={() => onSelect(item.actionId)}
                    />
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

import { Form, FormInstance, Input, Select, Space } from 'antd'
import React from 'react'

import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { DropdownSelect } from '../DropdownSelect'

const { Search } = Input

export const SORT_OPTIONS = [
  { key: 'popularity', label: 'Popularity' },
  { key: 'impact', label: 'Impact' },
]

export interface FilterFormItems {
  tags?: string[]
  search?: string
  sorting?: string
}

interface FilterBarProps {
  form: FormInstance<FilterFormItems>
  initialValues?: FilterFormItems
  tags?: string[]
  onValuesChange?: (_: FilterFormItems, allValues: FilterFormItems) => void
}

export const FilterBar = ({
  form,
  initialValues,
  onValuesChange,
  tags = [ALL_ACTIONS_LABEL],
}: FilterBarProps) => {
  return (
    <Form
      className="filter-bar"
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <Form.Item name="tags">
        <DropdownSelect
          items={tags.map((t) => ({ label: t, value: t }))}
          singleMode
        />
      </Form.Item>

      <Space>
        <Form.Item name="sorting">
          <Select placeholder="Please select">
            {SORT_OPTIONS.map((option) => (
              <Select.Option key={option.key}>{option.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="search">
          <Search placeholder="Search..." />
        </Form.Item>
      </Space>
    </Form>
  )
}

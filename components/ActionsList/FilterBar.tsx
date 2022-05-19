import { Form, FormInstance, Input, Select, Space } from 'antd'
import React from 'react'

import { DropdownSelect } from '../DropdownSelect'

const { Search } = Input

const SORT_OPTIONS = [
  { key: 'impact', label: 'Impact' },
  { key: 'popularity', label: 'Popularity' },
]

const SortOptions = () => {
  return (
    <Select placeholder="Please select">
      {SORT_OPTIONS.map((option) => (
        <Select.Option key={option.key}>{option.label}</Select.Option>
      ))}
    </Select>
  )
}

export interface FilterFormItems {
  tags: string[]
}

interface FilterBarProps {
  form: FormInstance<FilterFormItems>
  initialValues?: FilterFormItems
  tags: string[]
  onSearch?: (value: string) => void
  onValuesChange?: (_: FilterFormItems, allValues: FilterFormItems) => void
}

export const FilterBar = ({
  form,
  initialValues,
  onSearch,
  onValuesChange,
  tags,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <Form
        form={form}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="tags">
          <DropdownSelect items={tags.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
      </Form>
      <Space>
        <SortOptions />
        <Search onSearch={onSearch} placeholder="Search..." />
      </Space>
    </div>
  )
}

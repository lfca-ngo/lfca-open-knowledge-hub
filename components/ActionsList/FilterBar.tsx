import { Form, FormInstance, Input, Select, Space } from 'antd'
import React from 'react'
import { CategoryTreesProps } from '../../services/contentful'

import { CategoryTree } from './CategoryTree'

const { Search } = Input

export const SORT_OPTIONS = [
  { key: 'popularity', label: 'Popularity' },
  { key: 'impact', label: 'Impact' },
]

export interface FilterFormItems {
  search?: string
  sorting?: string
}

interface FilterBarProps {
  form: FormInstance<FilterFormItems>
  initialValues?: FilterFormItems

  categoryTrees: CategoryTreesProps
  onValuesChange?: (_: FilterFormItems, allValues: FilterFormItems) => void
}

export const FilterBar = ({
  form,
  initialValues,
  onValuesChange,
  categoryTrees,
}: FilterBarProps) => {
  return (
    <Form
      className="filter-bar"
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <Form.Item name="categories">
        <CategoryTree categoryTrees={categoryTrees} />
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

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
  categoryTrees,
  form,
  initialValues,
  onValuesChange,
}: FilterBarProps) => {
  return (
    <Form
      className="filter-bar"
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <header>
        <div className="title">Browse all actions</div>

        <Space>
          <Form.Item name="sorting">
            <Select placeholder="Please select" size="small">
              {SORT_OPTIONS.map((option) => (
                <Select.Option key={option.key}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="search">
            <Search placeholder="Search..." size="small" />
          </Form.Item>
        </Space>
      </header>

      <Space className="category-tree-container" direction="vertical">
        <Form.Item name="categories">
          <CategoryTree categoryTrees={categoryTrees} />
        </Form.Item>
      </Space>
    </Form>
  )
}

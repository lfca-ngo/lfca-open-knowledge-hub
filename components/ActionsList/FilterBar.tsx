import { Form, FormInstance, Input, Select, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CategoryTreeProps } from '../../services/contentful'
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
  categoryTrees?: CategoryTreeProps
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
      className={`filter-bar ${classNames({
        'without-category-tree': !!!categoryTrees,
      })}`}
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <div className="header-bar">
        {categoryTrees && <div className="title">Browse all actions</div>}

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
      </div>

      {categoryTrees && (
        <Space className="category-tree-container" direction="vertical">
          <Form.Item name="categories">
            <CategoryTree categoryTrees={categoryTrees} />
          </Form.Item>
        </Space>
      )}
    </Form>
  )
}

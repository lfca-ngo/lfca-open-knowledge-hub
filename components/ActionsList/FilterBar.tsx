import { Form, FormInstance, Input, Select, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CategoryTreeComponent } from './CategoryTree'
import { RootCategorySelector } from './RootCategorySelector'

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
  mode?: 'default' | 'compact'
  initialValues?: FilterFormItems
  onValuesChange?: (_: FilterFormItems, allValues: FilterFormItems) => void
}

export const FilterBar = ({
  form,
  initialValues,
  mode = 'default',
  onValuesChange,
}: FilterBarProps) => {
  return (
    <Form
      className={`filter-bar ${classNames(mode)}`}
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      {mode === 'compact' ? (
        <Space className="compact-filter-bar">
          <Form.Item name="categories">
            <RootCategorySelector />
          </Form.Item>
          <Form.Item name="search">
            <Search placeholder="Search..." size="large" />
          </Form.Item>
        </Space>
      ) : (
        <>
          <div className="header-bar">
            <div className="title">Browse all actions</div>
            <Space>
              <Form.Item name="sorting">
                <Select placeholder="Please select" size="small">
                  {SORT_OPTIONS.map((option) => (
                    <Select.Option key={option.key}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="search">
                <Search placeholder="Search..." size="small" />
              </Form.Item>
            </Space>
          </div>

          <Space className="category-tree-container" direction="vertical">
            <Form.Item name="categories">
              <CategoryTreeComponent />
            </Form.Item>
          </Space>
        </>
      )}
    </Form>
  )
}

import { Col, Form, FormInstance, Input, Row, Select, Space } from 'antd'
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
          <Row className="header-bar" gutter={12}>
            <Col md={16} xs={24}>
              <Form.Item name="search">
                <Search
                  placeholder="Search for climate action..."
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item name="sorting">
                <Select placeholder="Please select" size="large">
                  {SORT_OPTIONS.map((option) => (
                    <Select.Option key={option.key}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

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

import { Form, FormInstance, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CategoryTreeComponent } from './CategoryTree'

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
      <Form.Item name="categories">
        <CategoryTreeComponent />
      </Form.Item>
    </Form>
  )
}

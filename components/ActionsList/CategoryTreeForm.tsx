import { Form, FormInstance } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CategoryTreeComponent } from './CategoryTree'

export const SORT_OPTIONS = [
  { key: 'popularity', label: 'Popularity' },
  { key: 'impact', label: 'Impact' },
]

export interface CategoryTreeFormItems {
  search?: string
  sorting?: string
}

interface CategoryTreeFormProps {
  form: FormInstance<CategoryTreeFormItems>
  mode?: 'default' | 'compact'
  initialValues?: CategoryTreeFormItems
  onValuesChange?: (
    _: CategoryTreeFormItems,
    allValues: CategoryTreeFormItems
  ) => void
}

export const CategoryTreeForm = ({
  form,
  initialValues,
  mode = 'default',
  onValuesChange,
}: CategoryTreeFormProps) => {
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

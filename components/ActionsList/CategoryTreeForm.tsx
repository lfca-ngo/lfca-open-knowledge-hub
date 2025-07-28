import { ControlOutlined } from '@ant-design/icons'
import { Divider, Form, FormInstance } from 'antd'
import React from 'react'

import { CategoryTreeComponent } from './CategoryTree'
import styles from './styles.module.less'

export const SORT_OPTIONS = [
  { key: 'impact', label: 'Impact' },
  { key: 'popularity', label: 'Popularity' },
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
  onValuesChange,
}: CategoryTreeFormProps) => {
  return (
    <Form
      className={styles['filter-bar']}
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <h4>
        <ControlOutlined style={{ marginRight: '6px' }} />
        Filter by pillar
        <Divider style={{ margin: '20px 0 0' }} />
      </h4>
      <Form.Item name="categories">
        <CategoryTreeComponent />
      </Form.Item>
    </Form>
  )
}

import { AppstoreAddOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Col, Form, FormInstance, Radio, Row, Space } from 'antd'

import { SORT_OPTIONS } from '../ActionsList/CategoryTreeForm'
import { DropdownSelector, KeyLabel } from '../DropdownSelector'
import styles from './styles.module.less'

export interface FilterBarFormItems {
  sorting?: string
}

interface FilterBarProps {
  filterItemsTags: KeyLabel[]
  form: FormInstance<FilterBarFormItems>
  onValuesChange?: (
    _: FilterBarFormItems,
    allValues: FilterBarFormItems
  ) => void
}

export const FilterBar = ({
  filterItemsTags = [],
  form,
  onValuesChange,
}: FilterBarProps) => {
  return (
    <div className={styles['filter-bar']}>
      <Form
        form={form}
        initialValues={{ sorting: 'impact' }}
        onValuesChange={onValuesChange}
      >
        <Row>
          <Col md={12} xs={24}>
            <Space>
              <Form.Item name="hasRelatedActions">
                <DropdownSelector
                  buttonContent={`Filter by related actions`}
                  buttonProps={{
                    icon: <SortAscendingOutlined />,
                    size: 'small',
                    type: 'link',
                  }}
                  items={[
                    {
                      key: 'all',
                      label: 'Show all',
                    },
                    {
                      key: 'yes',
                      label: 'With related actions',
                    },
                    {
                      key: 'no',
                      label: 'Without related actions',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="filtering">
                <DropdownSelector
                  buttonContent={`Filter by tags`}
                  buttonProps={{
                    disabled: true,
                    icon: <AppstoreAddOutlined />,
                    size: 'small',
                    type: 'link',
                  }}
                  items={filterItemsTags}
                />
              </Form.Item>
            </Space>
          </Col>
          <Col className="align-right" md={12} xs={24}>
            <Form.Item label="Sort by" name="sorting">
              <Radio.Group size="small">
                {SORT_OPTIONS.map((option) => (
                  <Radio.Button key={option.key} value={option.key}>
                    {option.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

import { Col, Form, FormProps, Row, Select } from 'antd'

import { MultiSelect } from '../../../components/MultiSelect'
import {
  ServiceProviderFilterFragment,
  ServiceProviderFilterType,
  ServiceProviderFragment,
} from '../../../services/lfca-backend'
import { getFilterValues } from '../utils'

const { Option } = Select

export type FilterFormItems = Record<
  keyof ServiceProviderFragment,
  number | string | (number | string)[] | undefined
>

interface FilterFormProps {
  filters: ServiceProviderFilterFragment[]
  form: FormProps['form']
  onValuesChange: (_: FilterFormItems, allValues: FilterFormItems) => void
  providers: ServiceProviderFragment[]
}

export const FilterForm = ({
  filters,
  form,
  onValuesChange,
  providers,
}: FilterFormProps) => {
  const renderInput = (filter: ServiceProviderFilterFragment) => {
    const possibleValues = getFilterValues(
      providers,
      filter.attribute as 'model' | 'services' | 'supplyChainComplexity',
      filter.values
    )

    switch (filter.type) {
      case ServiceProviderFilterType.MULTISELECT:
      case ServiceProviderFilterType.SELECT: {
        if (possibleValues.length > 5) {
          return (
            <Select
              allowClear
              mode={
                filter.type === ServiceProviderFilterType.SELECT
                  ? undefined
                  : 'multiple'
              }
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {possibleValues.map((v) => (
                <Option key={v.key} value={v.key}>
                  {v.label}
                </Option>
              ))}
            </Select>
          )
        } else {
          return (
            <MultiSelect
              mode={
                filter.type === ServiceProviderFilterType.SELECT
                  ? 'single'
                  : 'multiple'
              }
              options={possibleValues.map((v) => ({
                help: v.help,
                key: v.key,
                label: v.label,
              }))}
            />
          )
        }
      }

      default:
        return null
    }
  }

  return (
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
      <Row gutter={24}>
        {filters.map((filter) => (
          <Col key={filter.id} span={12}>
            <Form.Item label={filter.label} name={filter.attribute}>
              {renderInput(filter)}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

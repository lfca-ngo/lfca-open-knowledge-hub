require('./styles.less')

import { Col, Form, List, Row, Select } from 'antd'
import { useState } from 'react'

import { ProviderCard } from './ProviderCard'

const { Option } = Select

const getUniqueTags = (array: any, key) =>
  array?.reduce((acc: any, provider: any) => {
    for (const tag of provider?.[key]) {
      if (!acc.includes(tag.name)) {
        acc.push(tag.name)
      }
    }
    return acc
  }, [])

export const ServiceProviderComparison = (props: any) => {
  const [list, setList] = useState(props?.providers)
  const serviceOptions = getUniqueTags(props.providers, 'services')
  const modelOptions = getUniqueTags(props.providers, 'model')

  const handleChange = (_: any, allValues: any) => {
    const filtered = props.providers.filter((provider: any) => {
      const { models, services } = allValues
      if (services && services.length > 0) {
        return services.includes(provider.services[0].name)
      }
      if (models && models.length > 0) {
        return models.includes(provider.model[0].name)
      }
      return true
    })
    setList(filtered)
  }

  return (
    <div className="service-provider-comparison">
      <Form layout="vertical" onValuesChange={handleChange}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Services" name="services">
              <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
              >
                {serviceOptions.map((service: any) => (
                  <Option key={service}>{service}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Models" name="models">
              <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
              >
                {modelOptions.map((model: any) => (
                  <Option key={model}>{model}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <List
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <ProviderCard provider={item} />
          </List.Item>
        )}
      />
    </div>
  )
}

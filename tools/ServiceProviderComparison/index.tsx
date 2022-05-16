require('./styles.less')

import { Col, Form, List, Row, Select } from 'antd'
import { useState } from 'react'

import { ProviderCard } from './ProviderCard'

const { Option } = Select

const getUniqueTags = (array: any, key: any) =>
  array?.reduce((acc: any, provider: any) => {
    for (const tag of provider?.[key]) {
      if (!acc.includes(tag.name)) {
        acc.push(tag.name)
      }
    }
    return acc
  }, [])

const FAKE_REVIEWS: {
  [key: string]: any
} = {
  ecoVadis: [
    {
      author: '3',
      content: 'Very thorough and easy to use',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 1000,
        cost: 10000,
      },
      rating: 5,
    },
  ],
  planetly: [
    {
      author: '1',
      content: 'I love Planetly!',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 50,
        cost: 1000,
      },
      rating: 5,
    },
    {
      author: '2',
      content: 'It was great but too pricey',
      createdAt: '2020-01-02',
      pricing: {
        companySize: 10,
        cost: 500,
      },
      rating: 4.5,
    },
  ],
}

export const ServiceProviderComparison = (props: any) => {
  // merge reviews and provider data into one object
  const mergedData = props?.providers.map((provider: any) => {
    const reviews = FAKE_REVIEWS[provider.providerId]
    return {
      ...provider,
      reviews,
    }
  })

  const [list, setList] = useState(mergedData)
  const serviceOptions = getUniqueTags(props.providers, 'services')
  const modelOptions = getUniqueTags(props.providers, 'model')

  const handleChange = (_: any, allValues: any) => {
    const filtered = mergedData.filter((provider: any) => {
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

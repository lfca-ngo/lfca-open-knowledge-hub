require('./styles.less')

import { Col, Drawer, Form, List, Row, Select } from 'antd'
import { useMemo, useState } from 'react'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import { FAKE_REVIEWS, getUniqueTags, mergeProviderData } from './utils'

const { Option } = Select

export interface Review {
  author: string
  content: string
  createdAt: string
  pricing: {
    companySize: number
    cost: number
  }
  rating: number
}

export interface Reviews {
  [key: string]: Review[]
}

export interface ServiceProvider extends ContentfulServiceProviderFields {
  reviews: Review[]
}

interface ServiceProviderComparisonProps {
  providers: ContentfulServiceProviderFields[]
}

interface FilterFormProps {
  services?: string[]
  models?: string[]
}

export const ServiceProviderComparison = ({
  providers,
}: ServiceProviderComparisonProps) => {
  const mergedData = useMemo(
    () => mergeProviderData(providers, FAKE_REVIEWS),
    [providers]
  )

  const [activeProvider, setActiveProvider] = useState<ServiceProvider>()
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState(mergedData)

  const serviceOptions = getUniqueTags(providers, 'services')
  const modelOptions = getUniqueTags(providers, 'model')

  const handleChange = (_: FilterFormProps, allValues: FilterFormProps) => {
    const filtered = mergedData.filter((provider) => {
      const { models, services } = allValues
      const providerModels = provider.model?.map((model) => model.name)
      const providerServices = provider.services?.map((service) => service.name)
      // only return providers that mal all of the criteria
      return (
        (models?.length === 0 ||
          models?.some((model) => providerModels?.includes(model))) &&
        (services?.length === 0 ||
          services?.some((service) => providerServices?.includes(service)))
      )
    })
    setList(filtered)
  }

  const handleOpenReviews = (provider: ServiceProvider) => {
    setActiveProvider(provider)
    setVisible(true)
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
                {serviceOptions.map((service) => (
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
                {modelOptions.map((model) => (
                  <Option key={model}>{model}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <List
        dataSource={list}
        renderItem={(item: ServiceProvider) => (
          <List.Item>
            <ProviderCard onOpenReviews={handleOpenReviews} provider={item} />
          </List.Item>
        )}
      />

      <Drawer onClose={() => setVisible(false)} visible={visible}>
        <ReviewsList reviews={activeProvider?.reviews} />
      </Drawer>
    </div>
  )
}

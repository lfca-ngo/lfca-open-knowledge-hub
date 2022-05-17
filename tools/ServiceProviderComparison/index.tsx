require('./styles.less')

import {
  Col,
  Drawer,
  Form,
  List,
  Row,
  Select,
  Button,
  Slider,
  Divider,
  Radio,
} from 'antd'
import { useMemo, useState } from 'react'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import { MultiSelect } from '../../components/MultiSelect'
import {
  FAKE_REVIEWS,
  getUniqueTags,
  MAX_PRICE,
  mergeProviderData,
  PRICE_FILTER_OPTIONS,
  MIN_PRICE,
} from './utils'

const { Option } = Select

export interface Review {
  author: string
  cons: string[]
  content: string
  createdAt: string
  pricing: {
    companySize: number
    cost: number
  }
  pros: string[]
  rating: number
}

export interface Reviews {
  [key: string]: Review[]
}

interface Range {
  from: number
  to: number
}

export interface DerivedReviewStats {
  ranges?: {
    cost: Range
    companySize: Range
  }
  avgRating?: number
  totalReviews?: number
}

export interface ServiceProvider extends ContentfulServiceProviderFields {
  reviews: Review[]
  reviewStats?: DerivedReviewStats
}

interface ServiceProviderComparisonProps {
  providers: ContentfulServiceProviderFields[]
}

interface FilterFormProps {
  services?: string[]
  models?: string[]
  cost?: number[]
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
    const { cost, models, services } = allValues
    console.log(cost, models, services)
    const filtered = mergedData.filter((provider) => {
      const providerModels = provider.model?.map((model) => model.name)
      const providerServices = provider.services?.map((service) => service.name)
      const lowestPrice = provider.reviewStats?.ranges?.cost?.from
      // if a form value is undefined, return true
      // if lowestPrice is in range of cost, return true
      // if lowestPrice is undefined, return true
      // if providerModels contains any of the models, return true
      // if providerServices contains any of the services, return true
      return (
        (models === undefined ||
          models.length === 0 ||
          providerModels?.some((model) => models.includes(model))) &&
        (services === undefined ||
          services.length === 0 ||
          providerServices?.some((service) => services.includes(service))) &&
        (cost === undefined ||
          cost.length === 0 ||
          (lowestPrice !== undefined &&
            cost[0] <= lowestPrice &&
            cost[1] >= lowestPrice))
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
      <Form
        initialValues={{ cost: [MIN_PRICE, MAX_PRICE] }}
        layout="vertical"
        onValuesChange={handleChange}
      >
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
          {/* <Col span={12}>
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
          </Col> */}
          <Col span={12}>
            <Form.Item label="Business Model" name="models">
              <MultiSelect
                options={modelOptions.map((m) => ({ key: m, label: m }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cost" name="cost">
              <Radio.Group className="radio-select" optionType="button">
                {PRICE_FILTER_OPTIONS.map((option, i) => (
                  <Radio key={`option-${i}`} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />

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

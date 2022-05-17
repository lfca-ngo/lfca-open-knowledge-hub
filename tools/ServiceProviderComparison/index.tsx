require('./styles.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import {
  Alert,
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Popover,
  Row,
  Select,
} from 'antd'
import { useMemo, useState } from 'react'

import { MultiSelect } from '../../components/MultiSelect'
import { ContentfulServiceProviderFields } from '../../services/contentful'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import {
  FAKE_REVIEWS,
  getUniqueTags,
  MAX_PRICE,
  mergeProviderData,
  MIN_PRICE,
  PRICE_FILTER_OPTIONS,
} from './utils'

const { Option } = Select
const { Search } = Input

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
  cost?: number[][]
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
    const { models, services } = allValues
    const [cost] = allValues.cost || []

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

  // searches name and services
  const handleSearch = (value: string) => {
    const filtered = mergedData.filter((provider) => {
      const providerName = provider.name
      const providerServices = provider.services?.map((service) => service.name)
      // find results regardless of case and completeness of search term
      return (
        providerName?.toLowerCase().includes(value.toLowerCase()) ||
        providerServices?.some((service) =>
          service.toLowerCase().includes(value.toLowerCase())
        )
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
          <Col span={12}>
            <Form.Item label="Model" name="models">
              <MultiSelect
                options={modelOptions.map((m) => ({ key: m, label: m }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Budget" name="cost">
              <MultiSelect mode="single" options={PRICE_FILTER_OPTIONS} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Supply chain" name="supplychain">
              <MultiSelect
                mode="single"
                options={[
                  { key: 'simple', label: 'Simple' },
                  { key: 'normal', label: 'Normal' },
                  { key: 'complex', label: 'Complex' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Alert
        action={[
          <Button icon={<ArrowRightOutlined />} key="start" type="primary">
            Open now
          </Button>,
        ]}
        description="As a lfca member you can use the Normative calculator for free. It is an expense based tool that covers all emissions including Scope 3."
        icon={
          <Avatar
            shape="square"
            size="large"
            src="/img/providers/normative.png"
          />
        }
        message="Get started with a free estimation"
        showIcon
        type="info"
      />

      <div className="search-bar">
        <div className="search-results-count">{list.length} results</div>
        <Divider />
        <Popover
          content={<Search onSearch={handleSearch} placeholder="Search..." />}
        >
          <Button icon={<SearchOutlined />} />
        </Popover>
      </div>

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

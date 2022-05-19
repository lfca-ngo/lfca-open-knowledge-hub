require('./styles.less')

import { Drawer, List } from 'antd'
import { useMemo, useState } from 'react'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { FeaturedProvider } from './FeaturedProvider'
import { FilterForm, FilterFormItems } from './FilterForm'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import { SearchBar } from './SearchBar'
import {
  arrayContains,
  FAKE_REVIEWS,
  mergeProviderData,
  numberInRange,
} from './utils'

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

  // filtering function
  const handleChange = (_: FilterFormItems, allValues: FilterFormItems) => {
    const { models, services, supplyChainComplexity } = allValues
    const [cost] = allValues.cost || []

    const filtered = mergedData.filter((provider) => {
      const providerSupplyChainComplexity = provider.supplyChainComplexity?.map(
        (s) => s.name
      )
      const providerModels = provider.model?.map((m) => m.name)
      const providerServices = provider.services?.map((s) => s.name)
      const lowestPrice = provider.reviewStats?.ranges?.cost?.from

      const isValid =
        arrayContains(models, providerModels) &&
        arrayContains(services, providerServices) &&
        arrayContains(supplyChainComplexity, providerSupplyChainComplexity) &&
        numberInRange(lowestPrice, cost)

      return isValid
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
      <FilterForm onValuesChange={handleChange} providers={providers} />
      <FeaturedProvider />
      <SearchBar itemsCount={list.length} onSearch={handleSearch} />
      <List
        dataSource={list}
        renderItem={(item: ServiceProvider) => (
          <List.Item>
            <ProviderCard onOpenReviews={handleOpenReviews} provider={item} />
          </List.Item>
        )}
      />
      {/* Review Drawer */}
      <Drawer
        className="drawer-md"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <ReviewsList reviews={activeProvider?.reviews} />
      </Drawer>
    </div>
  )
}

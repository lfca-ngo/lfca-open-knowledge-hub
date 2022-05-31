require('./styles.less')

import { Drawer, List } from 'antd'
import { useEffect, useState } from 'react'

import { Section } from '../../components/Layout'
import {
  ServiceProviderFragment,
  useServiceProvidersQuery,
} from '../../services/lfca-backend'
import { arrayContains, numberInRange } from '../../utils'
import { FeaturedProvider } from './FeaturedProvider'
import { FilterForm, FilterFormItems } from './FilterForm'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import { SearchBar } from './SearchBar'

export const ServiceProviderComparison = () => {
  const [activeProvider, setActiveProvider] =
    useState<ServiceProviderFragment | null>(null)

  // TODO: UI for error state
  // TODO: Render skeleton whil loading
  const [{ data, fetching }] = useServiceProvidersQuery()

  const [list, setList] = useState<ServiceProviderFragment[]>(
    data?.serviceProviders || []
  )

  useEffect(() => {
    setList(data?.serviceProviders || [])
  }, [data])

  // filtering function
  const handleChange = (_: FilterFormItems, allValues: FilterFormItems) => {
    const { models, services, supplyChainComplexity } = allValues
    const [cost] = allValues.cost || []

    const filtered = data?.serviceProviders.filter((provider) => {
      const providerSupplyChainComplexity = provider.supplyChainComplexity?.map(
        (s) => s.name || ''
      )
      const providerModels = provider.model?.map((m) => m.name || '')
      const providerServices = provider.services?.map((s) => s.name || '')
      const lowestPrice = provider.lowestPrice

      const isValid =
        arrayContains(models, providerModels) &&
        arrayContains(services, providerServices) &&
        arrayContains(supplyChainComplexity, providerSupplyChainComplexity) &&
        numberInRange(lowestPrice ?? undefined, cost)

      return isValid
    })
    setList(filtered || [])
  }

  // searches name and services
  const handleSearch = (value: string) => {
    const filtered = data?.serviceProviders.filter((provider) => {
      const providerName = provider.name
      const providerServices = provider.services?.map((service) => service.name)
      // find results regardless of case and completeness of search term
      return (
        providerName?.toLowerCase().includes(value.toLowerCase()) ||
        providerServices?.some(
          (service) =>
            service && service.toLowerCase().includes(value.toLowerCase())
        )
      )
    })
    setList(filtered || [])
  }

  return (
    <div className="service-provider-comparison">
      <FilterForm
        onValuesChange={handleChange}
        providers={data?.serviceProviders || []}
      />
      <FeaturedProvider />
      <SearchBar itemsCount={list.length} onSearch={handleSearch} />
      <List
        dataSource={list}
        loading={fetching}
        renderItem={(item) => (
          <List.Item>
            <ProviderCard
              onOpenReviews={(provider) => setActiveProvider(provider)}
              provider={item}
            />
          </List.Item>
        )}
      />
      {/* Review Drawer */}
      <Drawer
        className="drawer-md"
        onClose={() => setActiveProvider(null)}
        visible={!!activeProvider}
      >
        <Section title="Reviews">
          <ReviewsList serviceProviderContentId={activeProvider?.id} />
        </Section>
      </Drawer>
    </div>
  )
}

require('./styles.less')

import { Drawer, Form, List, Tabs } from 'antd'
import { useEffect, useState } from 'react'

import { Section } from '../../components/Layout'
import { useUser } from '../../hooks/user'
import {
  ServiceProviderFilterCondition,
  ServiceProviderFragment,
  ServiceProviderListFragment,
  Tag,
} from '../../services/lfca-backend'
import { arrayContains, arrayContainsAll } from '../../utils'
import { Assistant } from './Assistant'
import { FeaturedProvider } from './FeaturedProvider'
import { FilterForm, FilterFormItems } from './FilterForm'
import { ProviderCard } from './ProviderCard'
import { ReviewsList } from './ReviewsList'
import { SearchBar } from './SearchBar'

const { TabPane } = Tabs

interface ServiceProviderComparisonProps {
  serviceProviderList?: ServiceProviderListFragment
  showTitle?: boolean
}

export const ServiceProviderComparison = ({
  serviceProviderList,
  showTitle,
}: ServiceProviderComparisonProps) => {
  const [activeProvider, setActiveProvider] =
    useState<ServiceProviderFragment | null>(null)

  // both filters reference the same form
  const [form] = Form.useForm()
  const { isPaying } = useUser()

  const [list, setList] = useState<ServiceProviderFragment[]>(
    (serviceProviderList?.items || []).sort((a, b) => {
      return b?.reviewsCount - a?.reviewsCount
    })
  )

  useEffect(() => {
    // sort providers by amount of reviews
    const sortedList = (serviceProviderList?.items || []).sort((a, b) => {
      return b?.reviewsCount - a?.reviewsCount
    })

    setList(sortedList)
  }, [serviceProviderList?.items])

  // filtering function
  const handleChange = (_: FilterFormItems, allValues: FilterFormItems) => {
    const filtered = serviceProviderList?.items.filter((provider) => {
      // Check every individual filter value on each provider
      return Object.keys(allValues).every((attribute) => {
        let filterValue = allValues[attribute as keyof FilterFormItems]

        // If no filter is set for an attribute, we do not need to filter anything and all entries are valid
        if (filterValue === undefined) return true

        // Wrap single select values within an array to be able to use a unified logic below
        if (!Array.isArray(filterValue)) {
          filterValue = [filterValue]
        }

        // Deselecting a value from a multiselect can return in an empty array which is equal to no filter
        if (!filterValue.length) return true

        const providerValueForAttribute =
          provider[attribute as keyof ServiceProviderFragment]

        // If a provider does not have any value for the filtered attribute, it is filtered out
        if (
          providerValueForAttribute === null ||
          providerValueForAttribute === undefined
        )
          return false

        const filterConfig = serviceProviderList.filters.find(
          (f) => f.attribute === attribute
        )

        if (!filterConfig) return true

        switch (filterConfig.condition) {
          case ServiceProviderFilterCondition.CONTAINS:
            if (Array.isArray(providerValueForAttribute)) {
              // IMPORTANT:
              // If the filtered prop is an array we ALWAYS assume it is of type Tag
              return arrayContains(
                filterValue,
                (providerValueForAttribute as Tag[]).map((v) => v.name || '')
              )
            } else {
              return filterValue.includes(providerValueForAttribute)
            }

          case ServiceProviderFilterCondition.CONTAINS_ALL:
            if (Array.isArray(providerValueForAttribute)) {
              // IMPORTANT:
              // If the filtered prop is an array we ALWAYS assume it is of type Tag
              return arrayContainsAll(
                filterValue,
                (providerValueForAttribute as Tag[]).map((v) => v.name || '')
              )
            } else if (filterValue.length > 1) {
              // multiple selected filteres can never be all contained in a provider if the provider value is just a single value
              return false
            } else {
              return filterValue[0] === providerValueForAttribute
            }

          case ServiceProviderFilterCondition.VALUE_BELOW:
            // valueBelow only works on numbers
            if (typeof providerValueForAttribute !== 'number') return false
            // We can not check below multiple values so if multiple filter values are selected we use the lowest value
            // out of all number values
            const lowestFilterValue = Math.min(
              ...(filterValue.filter((v) => typeof v === 'number') as number[])
            )
            if (typeof lowestFilterValue !== 'number') return true

            return providerValueForAttribute <= lowestFilterValue

          default:
            return true
        }
      })
    })
    setList(filtered || [])
  }

  // searches name and services
  const handleSearch = (value: string) => {
    const filtered = serviceProviderList?.items.filter((provider) => {
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

  // visit provider
  const openWebsite = (url: string) => window.open(url ?? undefined, '_blank')

  return (
    <div className="service-provider-comparison">
      {showTitle ? <h2>{serviceProviderList?.title}</h2> : null}
      <Tabs defaultActiveKey="filter">
        <TabPane key="filter" tab="Filter">
          <FilterForm
            filters={serviceProviderList?.filters || []}
            form={form}
            onValuesChange={handleChange}
            providers={serviceProviderList?.items || []}
          />
        </TabPane>
        <TabPane key="assistant" tab="Assistant">
          <Assistant
            filters={serviceProviderList?.filters || []}
            form={form}
            onValuesChange={handleChange}
            providers={serviceProviderList?.items || []}
          />
        </TabPane>
      </Tabs>

      {/* Hide feature providers for non paying users */}
      {isPaying && (
        <>
          {serviceProviderList?.featured.map((serviceProvider) => (
            <FeaturedProvider
              key={serviceProvider.id}
              onOpenWebsite={openWebsite}
              serviceProvider={serviceProvider}
            />
          ))}
        </>
      )}

      <SearchBar itemsCount={list.length} onSearch={handleSearch} />
      <List
        dataSource={list}
        pagination={{ pageSize: 10 }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ProviderCard
              onOpenReviews={(provider) => setActiveProvider(provider)}
              onOpenWebsite={(provider) =>
                provider?.website && openWebsite(provider?.website)
              }
              provider={item}
            />
          </List.Item>
        )}
      />
      {/* Review Drawer */}
      <Drawer
        className="drawer-md"
        destroyOnClose
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

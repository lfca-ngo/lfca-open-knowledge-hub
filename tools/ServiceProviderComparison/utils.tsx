import { Option } from '../../components/MultiSelect'
import {
  ServiceProviderFilterFragment,
  ServiceProviderFilterValueType,
  ServiceProviderFragment,
} from '../../services/lfca-backend'

interface FilterValue {
  help?: string
  id: string
  label: string
  sortWeight?: number
  key: string | number
}
export const getFilterValues = (
  providers: ServiceProviderFragment[],
  key: keyof ServiceProviderFragment,
  values: ServiceProviderFilterFragment['values']
): FilterValue[] => {
  if (values) {
    return values.map((value) => ({
      id: value.id,
      key:
        value.type === ServiceProviderFilterValueType.INTEGER
          ? (value.integerValue as number)
          : (value.stringValue as string),
      label: value.label,
    }))
  }

  return providers.reduce((acc, provider) => {
    const valueForProvider = provider[key]
    if (!valueForProvider) return acc

    if (!Array.isArray(valueForProvider)) {
      if (acc.findIndex((v) => v.key === valueForProvider) < 0) {
        acc.push({
          help: undefined,
          id: valueForProvider.toString(),
          key: valueForProvider,
          label: valueForProvider,
          sortWeight: undefined,
        })
      }
    } else {
      for (const tag of valueForProvider) {
        if (tag.name && acc.findIndex((v) => v.key === tag.name) < 0) {
          acc.push({
            help: tag.help ?? undefined,
            id: tag.id,
            key: tag.name,
            label: tag.name,
            sortWeight: tag.sortWeight ?? undefined,
          })
        }
      }

      // sort acc by sortWeight
      acc.sort((a, b) => (b.sortWeight || 0) - (a.sortWeight || 0))
    }

    return acc
  }, [] as FilterValue[])
}

export const PRICE_FILTER_OPTIONS: Option[] = [
  {
    key: [0, 0],
    label: 'Free',
  },
  {
    key: [0, 1000],
    label: '<1k€',
  },
  {
    key: [1000, 5000],

    label: '1-5k€',
  },
  {
    key: [5000, 10000],
    label: '5-10k€',
  },
  {
    key: [10000, -1],
    label: '>10k€',
  },
]

export const arrayContains = (
  selectedArray?: string[],
  searchArray?: string[]
) => {
  const isValid =
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    searchArray?.some((entry) => selectedArray.includes(entry))

  return isValid
}

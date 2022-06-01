import { Option } from '../../components/MultiSelect'
import { ServiceProviderFragment, Tag } from '../../services/lfca-backend'

export const getUniqueTags = (
  array: ServiceProviderFragment[],
  key: keyof Pick<
    ServiceProviderFragment,
    'model' | 'services' | 'supplyChainComplexity'
  >
) =>
  array?.reduce((acc, provider) => {
    const tags = provider[key] || []

    for (const tag of tags) {
      if (tag.name && acc.findIndex((t) => t.name === tag.name) < 0) {
        acc.push(tag)
      }
    }

    // sort acc by sortWeight
    acc.sort((a, b) => (b.sortWeight || 0) - (a.sortWeight || 0))

    return acc
  }, [] as Tag[]) as Tag[]

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

export const numberInRange = (number?: number, range?: number[]) => {
  const isValid =
    range === undefined ||
    range.length === 0 ||
    (number !== undefined && range[0] <= number && range[1] >= number)

  return isValid
}

import { Option } from '../../components/MultiSelect'
import { ContentfulServiceProviderFields } from '../../services/contentful'
import { Reviews } from '.'
import { ServiceProvider } from '.'

export const getUniqueTags = (
  array: ContentfulServiceProviderFields[],
  key: keyof Pick<
    ContentfulServiceProviderFields,
    'model' | 'services' | 'supplyChainComplexity'
  >
) =>
  array?.reduce((acc, provider) => {
    const tags = provider[key] || []

    for (const tag of tags) {
      if (!acc.includes(tag.name)) {
        acc.push(tag.name)
      }
    }
    return acc
  }, [] as string[]) as string[]

export const FAKE_REVIEWS: Reviews = {
  ecoVadis: [
    {
      author: 'A',
      cons: [
        'But we also found it difficult to standardise processes within our unique company structure.',
      ],
      content:
        'Finally, I really love the fact that planetly is living up to their values and is continuously developing and improving.',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 1000,
        cost: 10000,
      },
      pros: ['Very thorough and easy to use', 'Great UX of the product'],
      rating: 5,
    },
    {
      author: 'E',
      cons: [
        'But we also found it difficult to standardise processes within our unique company structure.',
      ],
      content: 'Great',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 400,
        cost: 500,
      },
      pros: ['Very thorough and easy to use', 'Great UX of the product'],
      rating: 3,
    },
  ],
  planetly: [
    {
      author: 'F',
      cons: [
        'But we also found it difficult to standardise processes within our unique company structure.',
      ],
      content: 'I love Planetly!',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 50,
        cost: 1000,
      },
      pros: ['Very thorough and easy to use', 'Great UX of the product'],
      rating: 5,
    },
    {
      author: 'G',
      cons: [
        'But we also found it difficult to standardise processes within our unique company structure.',
      ],
      content: 'It was great but too pricey',
      createdAt: '2020-01-02',
      pricing: {
        companySize: 10,
        cost: 500,
      },
      pros: ['Very thorough and easy to use', 'Great UX of the product'],
      rating: 4.5,
    },
  ],
}

export const MIN_PRICE = 0
export const MAX_PRICE = 25000

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

const calculateProviderStats = (provider: ServiceProvider) => {
  // calculate cost range
  const ranges = provider.reviews?.reduce(
    (acc, review) => {
      // cost range
      if (review.pricing.cost <= acc.cost.from || acc.cost.from < 0) {
        acc.cost.from = review.pricing.cost
      }
      if (review.pricing.cost > acc.cost.to || acc.cost.from < 0) {
        acc.cost.to = review.pricing.cost
      }
      // companySize range
      if (
        review.pricing.companySize <= acc.companySize.from ||
        acc.companySize.from < 0
      ) {
        acc.companySize.from = review.pricing.companySize
      }
      if (
        review.pricing.companySize > acc.companySize.to ||
        acc.companySize.from < 0
      ) {
        acc.companySize.to = review.pricing.companySize
      }
      return acc
    },
    {
      companySize: {
        from: -1,
        to: -1,
      },
      cost: {
        from: -1,
        to: -1,
      },
    }
  )

  // calculate average review rating only once or when reviews change
  const ratings = provider?.reviews?.map(
    ({ rating }: { rating: number }) => rating
  )

  const avgRating =
    ratings?.reduce((acc: number, rating: number) => acc + rating, 0) /
    ratings?.length

  return {
    avgRating,
    ranges,
    totalReviews: ratings?.length || 0,
  }
}

const sortByRating = (a: ServiceProvider, b: ServiceProvider) => {
  const avgRatingA = a?.reviewStats?.avgRating || 0
  const avgRatingB = b?.reviewStats?.avgRating || 0
  return (
    (isNaN(avgRatingB) ? 0 : avgRatingB) - (isNaN(avgRatingA) ? 0 : avgRatingA)
  )
}

export const mergeProviderData = (
  providers: ContentfulServiceProviderFields[],
  reviews: Reviews
) => {
  // merge the reviews with the providers based on the providerId
  // and sort them based on the average review rating derived from calculateProviderStats
  return providers
    .map((provider) => {
      const matchedReviews = reviews[provider.providerId]
      const serviceProvider = {
        ...provider,
        reviews: matchedReviews,
      }
      return {
        ...serviceProvider,
        reviewStats: calculateProviderStats(serviceProvider),
      }
    })
    .sort(sortByRating) as ServiceProvider[]
}

export const arrayContains = (
  selectedArray?: string[],
  searchArray?: string[]
) => {
  return (
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    searchArray?.some((entry) => selectedArray.includes(entry))
  )
}

export const numberInRange = (number?: number, range?: number[]) => {
  return (
    range === undefined ||
    range.length === 0 ||
    (number !== undefined && range[0] <= number && range[1] >= number)
  )
}

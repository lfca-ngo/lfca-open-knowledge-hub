import { ContentfulServiceProviderFields } from '../../services/contentful'
import { Reviews } from '.'
import { ServiceProvider } from '.'

export const mergeProviderData = (
  providers: ContentfulServiceProviderFields[],
  reviews: Reviews
) => {
  return providers.map((provider) => {
    const matchedReviews = reviews[provider.providerId]
    return {
      ...provider,
      reviews: matchedReviews,
    }
  }) as ServiceProvider[]
}

export const getUniqueTags = (
  array: ContentfulServiceProviderFields[],
  key: keyof Pick<ContentfulServiceProviderFields, 'model' | 'services'>
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
      author: '3',
      content: 'Very thorough and easy to use',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 1000,
        cost: 10000,
      },
      rating: 5,
    },
    {
      author: '4',
      content: 'Great',
      createdAt: '2020-01-01',
      pricing: {
        companySize: 400,
        cost: 500,
      },
      rating: 3,
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

export const calculateProviderStats = (provider: ServiceProvider) => {
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
    total: ratings?.length || 0,
  }
}

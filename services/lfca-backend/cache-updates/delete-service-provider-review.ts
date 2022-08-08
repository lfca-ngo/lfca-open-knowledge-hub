import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  DeleteServiceProviderReviewMutation,
  DeleteServiceProviderReviewMutationVariables,
} from '../generated'

export const deleteServiceProviderReview: UpdateResolver<
  DeleteServiceProviderReviewMutation,
  DeleteServiceProviderReviewMutationVariables
> = (result, args, cache) => {
  if (result.deleteServiceProviderReview) {
    cache.invalidate({
      __typename: 'ServiceProviderReview',
      id: args.input.serviceProviderReviewId,
    })
  }
}

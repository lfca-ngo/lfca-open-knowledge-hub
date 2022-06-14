import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompleteUserActionMutation,
  CompleteUserActionMutationVariables,
} from '../generated'

export const completeUserAction: UpdateResolver<
  CompleteUserActionMutation,
  CompleteUserActionMutationVariables
> = (_, __, cache) => {
  /**
   * NOTE:
   * If a user action is completed again (renewed), the BE will set the previously completed to expired (setting ID to random uuid)
   * and create a new completed item (with an ID using the userId and contentId).
   *
   * To keep things simply we just invalidate the cache for all queries where
   * a filter for `isCompleted` is used in order to force a refetch  *
   */
  cache.invalidate('Query', 'userActions', {
    input: {
      filter: {
        isCompleted: true,
        isExpired: true,
      },
    },
  })
}

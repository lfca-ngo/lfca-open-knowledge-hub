import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompleteUserActionMutation,
  CompleteUserActionMutationVariables,
} from '../generated'

export const completeUserAction: UpdateResolver<
  CompleteUserActionMutation,
  CompleteUserActionMutationVariables
> = (result, args, cache) => {
  /**
   * NOTE:
   * If a user action is completed again, the BE will set the previously completed to expired (setting ID to random uuid)
   * and create a new completed item (with an ID using the userId and contentId).
   *
   * To keep things simply we just invalidate the cache for the completed and expired query to force a refetch
   */
  cache.invalidate('Query', 'userActions', {
    input: { filter: { isCompleted: true, isExpired: true } },
  })
}

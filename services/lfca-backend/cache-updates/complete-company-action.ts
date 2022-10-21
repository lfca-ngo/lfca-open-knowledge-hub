import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompleteCompanyActionMutation,
  CompleteCompanyActionMutationVariables,
} from '../generated'

export const completeCompanyAction: UpdateResolver<
  CompleteCompanyActionMutation,
  CompleteCompanyActionMutationVariables
> = (_, args, cache) => {
  /**
   * NOTE:
   * If a company action is completed again (renewed), the BE will set the previously completed to expired (setting ID to random uuid)
   * and create a new completed item (with an ID using the companyId and contentId).
   *
   * To keep things simply we just invalidate the cache for all queries where
   * a filter for `isCompleted` is used in order to force a refetch
   */

  // Reset the cache for the CompletedActions
  cache.invalidate('Query', 'companyActions', {
    input: {
      filter: {
        isCompleted: true,
      },
    },
  })

  // Reset the cache for the ActionHistory
  cache.invalidate('Query', 'companyActions', {
    input: {
      filter: {
        actionContentIds: [args.input.actionContentId],
        isCompleted: true,
        isExpired: true,
      },
    },
  })
}

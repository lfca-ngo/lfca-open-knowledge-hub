import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompleteCompanyActionMutation,
  CompleteCompanyActionMutationVariables,
  CompletedCompanyActionsDocument,
  CompletedCompanyActionsQuery,
} from '../generated'

export const completeCompanyAction: UpdateResolver<
  CompleteCompanyActionMutation,
  CompleteCompanyActionMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<CompletedCompanyActionsQuery>(
    { query: CompletedCompanyActionsDocument },
    (data) => {
      if (!data?.completedCompanyActions) return data

      if (args.input.isCompleted) {
        // Add the completed action to the list of completedActions
        data.completedCompanyActions = [
          ...data.completedCompanyActions,
          result.completeCompanyAction,
        ]
      } else {
        // Find and remove the incompleted action from the list of completedActions
        data.completedCompanyActions = data.completedCompanyActions.filter(
          (item) => item?.id !== result.completeCompanyAction.id
        )
      }
      return data
    }
  )
}

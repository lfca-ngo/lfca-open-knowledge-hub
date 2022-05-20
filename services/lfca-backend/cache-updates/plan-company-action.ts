import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables,
  PlannedCompanyActionsDocument,
  PlannedCompanyActionsQuery,
} from '../generated'

export const planCompanyAction: UpdateResolver<
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<PlannedCompanyActionsQuery>(
    { query: PlannedCompanyActionsDocument },
    (data) => {
      if (!data?.plannedCompanyActions) return data

      if (args.input.isPlanned) {
        // Add the completed action to the list of completedActions
        data.plannedCompanyActions.push(result.planCompanyAction)
      } else {
        // Find and remove the incompleted action from the list of completedActions
        data.plannedCompanyActions = data.plannedCompanyActions.filter(
          (item) => item?.id !== result.planCompanyAction.id
        )
      }
      return data
    }
  )
}

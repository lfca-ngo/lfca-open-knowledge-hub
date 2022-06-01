import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompanyActionsListDocument,
  CompanyActionsListQuery,
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables,
} from '../generated'

export const planCompanyAction: UpdateResolver<
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<CompanyActionsListQuery>(
    {
      query: CompanyActionsListDocument,
      variables: { input: { filter: { planned: true } } },
    },
    (data) => {
      if (!data?.companyActions) return data

      if (args.input.isPlanned) {
        // Add the completed action to the list of completedActions
        data.companyActions.push(result.planCompanyAction)
      } else {
        // Find and remove the incompleted action from the list of completedActions
        data.companyActions = data.companyActions.filter(
          (item) => item?.id !== result.planCompanyAction.id
        )
      }
      return data
    }
  )
}

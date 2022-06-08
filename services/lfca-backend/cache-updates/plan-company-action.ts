import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CompanyActionsListDocument,
  CompanyActionsListQuery,
  CompanyActionsListQueryVariables,
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables,
} from '../generated'

export const planCompanyAction: UpdateResolver<
  PlanCompanyActionMutation,
  PlanCompanyActionMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<CompanyActionsListQuery, CompanyActionsListQueryVariables>(
    {
      query: CompanyActionsListDocument,
      variables: { input: { filter: { isPlanned: true } } },
    },
    (data) => {
      if (!data?.companyActions) return data

      if (args.input.isPlanned) {
        // Add the completed action to the list of completedActions
        data.companyActions = [result.planCompanyAction, ...data.companyActions]
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

import { Resolver } from '@urql/exchange-graphcache'

import {
  CompanyActionDetailsQuery,
  CompanyActionDetailsQueryVariables,
  CompanyActionsListDocument,
  CompanyActionsListQuery,
  CompanyActionsListQueryVariables,
} from '../generated'

export const companyAction: Resolver<
  CompanyActionDetailsQuery,
  CompanyActionDetailsQueryVariables
> = (parent, args, cache) => {
  /**
   * Since we use the exact same fragment (CompanyActionListItem) when querying ALL actions
   * as well as a single action, we can try to resolve the companyAction from allActions cache
   */
  const cachedActionFromAllActions = cache
    .readQuery<CompanyActionsListQuery, CompanyActionsListQueryVariables>({
      query: CompanyActionsListDocument,
    })
    ?.companyActions.find(
      (action) => action.contentId === args.input.actionContentId
    )

  if (cachedActionFromAllActions) return cachedActionFromAllActions

  // use default logic
  return parent.companyAction
}

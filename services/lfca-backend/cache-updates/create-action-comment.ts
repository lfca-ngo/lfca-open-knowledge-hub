import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  ActionCommentsDocument,
  ActionCommentsQuery,
  ActionCommentsQueryVariables,
  CreateActionCommentMutation,
  CreateActionCommentMutationVariables,
} from '../generated'

export const createActionComment: UpdateResolver<
  CreateActionCommentMutation,
  CreateActionCommentMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<ActionCommentsQuery, ActionCommentsQueryVariables>(
    {
      query: ActionCommentsDocument,
      variables: {
        input: {
          actionContentId: args.input.actionContentId,
        },
      },
    },
    (data) => {
      if (!data?.actionComments)
        return {
          actionComments: [result.createActionComment],
        }

      // Add the completed action to the list of completedActions
      data.actionComments = [result.createActionComment, ...data.actionComments]

      return data
    }
  )
}

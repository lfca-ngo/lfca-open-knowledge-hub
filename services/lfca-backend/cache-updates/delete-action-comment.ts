import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  DeleteActionCommentMutation,
  DeleteActionCommentMutationVariables,
} from '../generated'

export const deleteActionComment: UpdateResolver<
  DeleteActionCommentMutation,
  DeleteActionCommentMutationVariables
> = (result, args, cache) => {
  if (result.deleteActionComment) {
    cache.invalidate({
      __typename: 'ActionComment',
      id: args.input.id,
    })
  }
}

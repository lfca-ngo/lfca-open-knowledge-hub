import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  RemoveEventParticipantMutation,
  RemoveEventParticipantMutationVariables,
} from '../generated'

export const removeEventParticipant: UpdateResolver<
  RemoveEventParticipantMutation,
  RemoveEventParticipantMutationVariables
> = (_, args, cache) => {
  cache.invalidate({
    __typename: 'EventParticipant',
    id: `${args.input.eventId}_${args.input.userId}`,
  })
}

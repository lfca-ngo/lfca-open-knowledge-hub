import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  DeleteEventParticipationRequestMutation,
  DeleteEventParticipationRequestMutationVariables,
} from '../generated'

export const deleteEventParticipationRequest: UpdateResolver<
  DeleteEventParticipationRequestMutation,
  DeleteEventParticipationRequestMutationVariables
> = (result, args, cache) => {
  if (result.deleteEventParticipationRequest) {
    cache.invalidate({
      __typename: 'EventParticipationRequest',
      id: args.input.eventParticipationRequestId,
    })
  }
}

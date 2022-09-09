import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  DeleteEventParticipationRequestMutation,
  DeleteEventParticipationRequestMutationVariables,
} from '../generated'

export const deleteEventParticipationRequest: UpdateResolver<
  DeleteEventParticipationRequestMutation,
  DeleteEventParticipationRequestMutationVariables
> = (result, _, cache) => {
  if (result.deleteEventParticipationRequest) {
    cache.invalidate({
      __typename: 'EventParticipationRequest',
      id: result.deleteEventParticipationRequest.id,
    })
  }
}

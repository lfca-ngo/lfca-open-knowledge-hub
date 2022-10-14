import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  EventParticipantFragmentDoc,
  UpdateEventParticipantStatusMutation,
  UpdateEventParticipantStatusMutationVariables,
} from '../generated'

export const updateEventParticipantStatus: UpdateResolver<
  UpdateEventParticipantStatusMutation,
  UpdateEventParticipantStatusMutationVariables
> = (_, args, cache) => {
  const cachedParticipation = cache.readFragment(EventParticipantFragmentDoc, {
    __typename: 'EventParticipant',
    id: `${args.input.eventId}_${args.input.userId}`,
  })

  if (cachedParticipation) {
    cache.writeFragment(EventParticipantFragmentDoc, {
      ...cachedParticipation,
      status: args.input.status,
    })
  }
}

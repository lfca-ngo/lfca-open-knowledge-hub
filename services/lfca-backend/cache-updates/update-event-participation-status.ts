import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  EventParticipationFragmentDoc,
  UpdateEventParticipationStatusMutation,
  UpdateEventParticipationStatusMutationVariables,
} from '../generated'

export const updateEventParticipationStatus: UpdateResolver<
  UpdateEventParticipationStatusMutation,
  UpdateEventParticipationStatusMutationVariables
> = (_, args, cache) => {
  const cachedParticipation = cache.readFragment(
    EventParticipationFragmentDoc,
    {
      __typename: 'EventParticipation',
      id: `${args.input.eventId}_${args.input.userId}`,
    }
  )

  if (cachedParticipation) {
    cache.writeFragment(EventParticipationFragmentDoc, {
      ...cachedParticipation,
      status: args.input.status,
    })
  }
}

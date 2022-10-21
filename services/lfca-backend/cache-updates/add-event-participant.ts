import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  AddEventParticipantMutation,
  AddEventParticipantMutationVariables,
} from '../generated'

export const addEventParticipant: UpdateResolver<
  AddEventParticipantMutation,
  AddEventParticipantMutationVariables
> = (_, args, cache) => {
  /**
   * NOTE:
   * The `addEventParticipant` mutation does not return the type `EventParticipant`
   * but instead the connected `Event`.
   * This is becuse when a user is updating the `EventParticiation.status` (e.g. accepting RSVP)
   * the `Event.participationStatus` should also be updated which is not trival to do
   * on the client cache.
   *
   * So we return the updated `Event` for all `EventParticipant` mutations and simply invalidate
   * the client cache for the `eventParticipants` Query.
   */

  // Reset the cache for the CompletedActions
  cache.invalidate('Query', 'eventParticipants', {
    input: {
      eventId: args.input.eventId,
    },
  })
}

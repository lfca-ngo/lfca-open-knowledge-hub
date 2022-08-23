import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CreateEventParticipationRequestMutation,
  CreateEventParticipationRequestMutationVariables,
  EventParticipationRequestsDocument,
  EventParticipationRequestsQuery,
  EventParticipationRequestsQueryVariables,
} from '../generated'

export const createEventParticipationRequest: UpdateResolver<
  CreateEventParticipationRequestMutation,
  CreateEventParticipationRequestMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<
    EventParticipationRequestsQuery,
    EventParticipationRequestsQueryVariables
  >(
    {
      query: EventParticipationRequestsDocument,
      variables: {
        input: {
          eventId: args.input.eventId,
        },
      },
    },
    (data) => {
      if (!data?.eventParticipationRequests)
        return {
          eventParticipationRequests: [result.createEventParticipationRequest],
        }

      // Add the completed action to the list of completedActions
      data.eventParticipationRequests = [
        result.createEventParticipationRequest,
        ...data.eventParticipationRequests,
      ]

      return data
    }
  )
}

import { UpdateResolver } from '@urql/exchange-graphcache'

import {
  CreateEventMutation,
  CreateEventMutationVariables,
  EventsDocument,
  EventsQuery,
  EventsQueryVariables,
} from '../generated'

export const createEvent: UpdateResolver<
  CreateEventMutation,
  CreateEventMutationVariables
> = (result, args, cache) => {
  cache.updateQuery<EventsQuery, EventsQueryVariables>(
    {
      query: EventsDocument,
      variables: {
        input: {
          filter: {
            category: args.input.category,
            includeCancelled: true,
          },
        },
      },
    },
    (data) => {
      if (!data?.events)
        return {
          events: [result.createEvent],
        }

      // Add the completed action to the list of completedActions
      data.events = [result.createEvent, ...data.events]

      return data
    }
  )
}

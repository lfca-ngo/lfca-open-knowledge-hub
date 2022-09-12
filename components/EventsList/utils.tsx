import {
  EMPTY_EVENTS,
  EventFragment,
  EventParticipationStatus,
} from '../../services/lfca-backend'

export const getEventsByParticipationStatus = (events?: EventFragment[]) =>
  (events || EMPTY_EVENTS).reduce(
    (acc, curr) => {
      if (
        curr.participationRequestStatus === EventParticipationStatus.APPROVED
      ) {
        acc.participatingEvents.push(curr)
      } else {
        acc.otherEvents.push(curr)
        // push additionally to applied events
        if (
          curr.participationRequestStatus === EventParticipationStatus.PENDING
        ) {
          acc.appliedEvents.push(curr)
        }
      }
      return acc
    },
    {
      appliedEvents: [],
      otherEvents: [],
      participatingEvents: [],
    } as {
      appliedEvents: EventFragment[]
      participatingEvents: EventFragment[]
      otherEvents: EventFragment[]
    }
  )

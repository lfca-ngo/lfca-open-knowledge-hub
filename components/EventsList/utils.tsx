import {
  EMPTY_EVENTS,
  EventParticipantStatus,
  EventWithParticipantsFragment,
} from '../../services/lfca-backend'

export const getEventsByParticipationStatus = (
  events: EventWithParticipantsFragment[] | undefined = EMPTY_EVENTS
) =>
  events.reduce(
    (acc, curr) => {
      if (
        curr.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED
      ) {
        acc.participatingEvents.push(curr)
      } else {
        acc.otherEvents.push(curr)
        // push additionally to applied events
        if (
          curr.participationStatus ===
            EventParticipantStatus.AWAITING_ADMIN_APPROVAL ||
          curr.participationStatus === EventParticipantStatus.AWAITING_USER_RSVP
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
      appliedEvents: EventWithParticipantsFragment[]
      participatingEvents: EventWithParticipantsFragment[]
      otherEvents: EventWithParticipantsFragment[]
    }
  )

import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
} from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { EventAccepted } from './EventAccepted'
import { EventDeclined } from './EventDeclined'

interface EventRSVPResultProps {
  event?: EventFragment
  token?: string | string[]
}

export const EventRSVPResult = ({ event, token }: EventRSVPResultProps) => {
  if (event?.participationStatus === EventParticipantStatus.USER_RSVP_DECLINED)
    return <EventDeclined token={token} />

  if (event?.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED)
    return <EventAccepted event={event} token={token} />

  return (
    <>
      <h1>Missing event data</h1>
      <p>
        The link you are trying to open seems to be broken. If the problem
        persists, please contact us via{' '}
        <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>{DEFAULT_SUPPORT_EMAIL}</a>{' '}
      </p>
    </>
  )
}

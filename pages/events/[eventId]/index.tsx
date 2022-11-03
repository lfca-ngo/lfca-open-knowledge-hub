import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { EventCalendarLinks } from '../../../components/EventCalendarLinks'
import { EventDetails } from '../../../components/EventDetails'

import { OneColLayout } from '../../../components/Layout'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const Event: NextPage = () => {
  const { isReady, query } = useRouter()
  const { token, eventId } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  useEffect(() => {
    if (typeof token === 'string') {
      processEventRSVPToken({
        input: {
          token,
        },
      })
    }
  }, [processEventRSVPToken, token])

  return (
    <OneColLayout>
      <h1>Event Details</h1>

      <p>
        We are looking forward to seeing you in the event. Please add the invite
        to the calendar of your choice:
      </p>
      <EventCalendarLinks event={event} />

      <Divider />

      <EventDetails event={event} />
    </OneColLayout>
  )
}

export default Event

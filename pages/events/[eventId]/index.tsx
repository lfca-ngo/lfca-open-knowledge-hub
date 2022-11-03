import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { OneColLayout } from '../../../components/Layout'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const EventDetails: NextPage = () => {
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
      <EventDetails event={event} />
    </OneColLayout>
  )
}

export default EventDetails

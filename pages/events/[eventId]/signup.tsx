import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { OneColLayout } from '../../../components/Layout'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const EventSignUp: NextPage = () => {
  const { isReady, query } = useRouter()
  const { token } = query

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

  // @TODO: after successful sign up forward to event detail page where the event can be added to your calendar

  return (
    <OneColLayout>
      <h1>Sign up for Event</h1>
      <EventSignUp />
    </OneColLayout>
  )
}

export default EventSignUp

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { OneColLayout } from '../../../components/Layout'
import { useProcessEventToken } from '../../../hooks/useProcessEventToken'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const EventSignUp: NextPage = () => {
  const { isReady, query } = useRouter()
  const { token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  useProcessEventToken(processEventRSVPToken, token)

  // @TODO: after successful sign up forward to event detail page where the event can be added to your calendar

  return (
    <OneColLayout>
      <h1>Sign up for Event</h1>
      <EventSignUp />
    </OneColLayout>
  )
}

export default EventSignUp

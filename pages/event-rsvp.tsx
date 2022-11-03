import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { EventRSVPResult } from '../components/EventRSVPResult'
import { OneColLayout } from '../components/Layout'
import { useProcessEventRsvpTokenMutation } from '../services/lfca-backend'

/**
 * IMPORTANT: Page will be deprecated in
 * favor of the new events/ pages
 */

const EventRsvp: NextPage = () => {
  const { query } = useRouter()
  const { token } = query

  const [{ data }, processEventRSVPToken] = useProcessEventRsvpTokenMutation()

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
      <EventRSVPResult event={data?.processEventRSVPToken} token={token} />
    </OneColLayout>
  )
}

export default EventRsvp

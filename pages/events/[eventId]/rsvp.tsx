import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventRSVPResult } from '../../../components/EventRSVPResult'
import { OneColLayout } from '../../../components/Layout'
import { useProcessEventToken } from '../../../hooks/useProcessEventToken'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const EventRsvp: NextPage = () => {
  const { isReady, query } = useRouter()
  const { token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  useProcessEventToken(processEventRSVPToken, token)

  return (
    <OneColLayout>
      <EventRSVPResult
        event={data?.processEventRSVPToken}
        hasError={!!error}
        isFetching={fetching || !isReady}
        token={token}
      />
    </OneColLayout>
  )
}

export default EventRsvp

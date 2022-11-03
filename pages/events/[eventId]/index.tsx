import { Divider } from 'antd'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventCalendarLinks } from '../../../components/EventCalendarLinks'
import { EventDetails } from '../../../components/EventDetails'
import { OneColLayout } from '../../../components/Layout'
import { useProcessEventToken } from '../../../hooks/useProcessEventToken'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const Event: NextPage = () => {
  const { isReady, query } = useRouter()
  const { eventId, token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  useProcessEventToken(processEventRSVPToken, token)

  console.log(data)

  return (
    <OneColLayout>
      <h1>{data?.processEventRSVPToken.category}</h1>

      {/* <EventCalendarLinks event={} /> */}

      <Divider />

      <EventDetails hideTitle={true} />

      <p>
        We are looking forward to seeing you in the event. Please add the invite
        to the calendar of your choice:
      </p>
    </OneColLayout>
  )
}

export default Event

import { Skeleton } from 'antd'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventRSVPResult } from '../../../components/EventRSVPResult'
import { OneColLayout } from '../../../components/Layout'
import EventBackgroundImage from '../../../public/img/event-bg-image.png'
import {
  EventParticipantStatus,
  useProcessEventRsvpTokenMutation,
} from '../../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../../utils'

const EventRSVPPage: NextPage = () => {
  const { isReady, query } = useRouter()
  const { method, token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  React.useEffect(() => {
    if (
      typeof method !== 'string' ||
      (method !== 'accept' && method !== 'decline') ||
      typeof token !== 'string'
    )
      return

    processEventRSVPToken({
      input: {
        status:
          method === 'accept'
            ? EventParticipantStatus.USER_RSVP_ACCEPTED
            : EventParticipantStatus.USER_RSVP_DECLINED,
        token,
      },
    })
  }, [method, processEventRSVPToken, token])

  if (fetching || !isReady)
    return (
      <Skeleton
        active
        loading={fetching}
        paragraph={{
          rows: 2,
          width: '100%',
        }}
        title={{
          width: '100%',
        }}
      />
    )

  if (error)
    return (
      <>
        <h1>Something went wrong...</h1>
        <p>
          Please try again. If the problem persists, please contact us via{' '}
          <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
            {DEFAULT_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </>
    )

  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      <EventRSVPResult event={data?.processEventRSVPToken} token={token} />
    </OneColLayout>
  )
}

export default EventRSVPPage

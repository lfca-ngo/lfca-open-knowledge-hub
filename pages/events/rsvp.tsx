import { Skeleton } from 'antd'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { EventRSVPResult } from '../../components/EventRSVPResult'
import { OneColLayout } from '../../components/Layout'
import EventBackgroundImage from '../../public/img/event-bg-image.png'
import {
  EventParticipantStatus,
  useProcessEventRsvpTokenMutation,
} from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'

const STATUS_URL_PARAM_MAP: Record<string, EventParticipantStatus> = {
  accept: EventParticipantStatus.USER_RSVP_ACCEPTED,
  decline: EventParticipantStatus.USER_RSVP_DECLINED,
  unsubscribe: EventParticipantStatus.USER_UNSUBSCRIBED,
}

const EventRSVPPage: NextPage = () => {
  const [hasInvalidParamsError, setHasInvalidParamsError] =
    React.useState(false)
  const { isReady, query } = useRouter()
  const { method, token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  React.useEffect(() => {
    if (!isReady) return

    if (typeof method !== 'string' || typeof token !== 'string') {
      return setHasInvalidParamsError(true)
    }

    const status = STATUS_URL_PARAM_MAP[method]

    if (!status) {
      return setHasInvalidParamsError(true)
    }

    processEventRSVPToken({
      input: {
        status,
        token,
      },
    })
  }, [isReady, method, processEventRSVPToken, token])

  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      {fetching || !isReady ? (
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
      ) : error || hasInvalidParamsError ? (
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
      ) : (
        <EventRSVPResult event={data?.processEventRSVPToken} token={token} />
      )}
    </OneColLayout>
  )
}

export default EventRSVPPage

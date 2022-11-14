import { Skeleton } from 'antd'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { OneColLayout } from '../components/Layout'
import EventBackgroundImage from '../public/img/event-bg-image.png'
import { EventParticipantStatus } from '../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../utils'

/**
 * NOTE:
 * This page is deprecated and request will be forwareded to
 * `events/rsvp`
 */
const EventRsvp: NextPage = () => {
  const { isReady, query, replace } = useRouter()
  const { token } = query
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    if (!isReady) return
    if (typeof token !== 'string') return setHasError(true)

    // With legacy tokens, status was updated based on token payload status.
    // So we need to extract the status from the payload to be able to redirect
    const decodedToken = jwt.decode(token) as JwtPayload & {
      status?: EventParticipantStatus
    }
    if (
      !decodedToken ||
      !decodedToken.status ||
      (decodedToken.status !== EventParticipantStatus.USER_RSVP_ACCEPTED &&
        decodedToken.status !== EventParticipantStatus.USER_RSVP_DECLINED)
    ) {
      return setHasError(true)
    }

    replace({
      pathname: '/events/rsvp',
      query: {
        method:
          decodedToken.status === EventParticipantStatus.USER_RSVP_ACCEPTED
            ? 'accept'
            : 'decline',
        token,
      },
    })
  }, [replace, token, isReady])

  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      {hasError ? (
        <>
          <h1>Error!!!</h1>
          <p>
            Please try again. If the problem persists, please contact us via{' '}
            <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
              {DEFAULT_SUPPORT_EMAIL}
            </a>
            .
          </p>
        </>
      ) : (
        <Skeleton
          active
          loading={true}
          paragraph={{
            rows: 2,
            width: '100%',
          }}
          title={{
            width: '100%',
          }}
        />
      )}
    </OneColLayout>
  )
}

export default EventRsvp

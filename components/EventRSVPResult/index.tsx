import { Skeleton } from 'antd'
import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
} from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { EventAccepted } from './EventAccepted'
import { EventDeclined } from './EventDeclined'
import styles from './styles.module.less'

interface EventRSVPResultProps {
  event?: EventFragment
  hasError: boolean
  isFetching: boolean
  token?: string | string[]
}

export const EventRSVPResult = ({
  event,
  hasError,
  isFetching,
  token,
}: EventRSVPResultProps) => {
  if (isFetching)
    return (
      <Skeleton
        active
        className={styles.eventRSVPResultSkeleton}
        loading={isFetching}
        paragraph={{
          rows: 2,
          width: '100%',
        }}
        title={{
          width: '100%',
        }}
      />
    )

  if (event?.participationStatus === EventParticipantStatus.USER_RSVP_DECLINED)
    return <EventDeclined token={token} />

  if (event?.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED)
    return <EventAccepted event={event} token={token} />

  if (hasError)
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
    <>
      <h1>Missing event data</h1>
      <p>
        The link you are trying to open seems to be broken. If the problem
        persists, please contact us via{' '}
        <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>{DEFAULT_SUPPORT_EMAIL}</a>{' '}
      </p>
    </>
  )
}

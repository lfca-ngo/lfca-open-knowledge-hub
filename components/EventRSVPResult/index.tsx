import { Skeleton } from 'antd'
import Link from 'next/link'
import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
} from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { EventCalendarLinks } from '../EventCalendarLinks'
import styles from './styles.module.less'

interface EventRSVPResultProps {
  event?: EventFragment
  hasError: boolean
  isFetching: boolean
}

export const EventRSVPResult = ({
  event,
  hasError,
  isFetching,
}: EventRSVPResultProps) => {
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
    >
      {hasError || !event ? (
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
      ) : event.participationStatus ===
        EventParticipantStatus.USER_RSVP_DECLINED ? (
        <>
          <h1>Thank you!</h1>
          <p>
            You can re-join anytime in our{' '}
            <Link href="/community/groups">app</Link>.
          </p>
        </>
      ) : (
        <>
          <h1>Thank you!</h1>
          <p>
            We are looking forward to seeing you in the event. Please add the
            invite to the calendar of your choice:
          </p>
          <EventCalendarLinks event={event} />
        </>
      )}
    </Skeleton>
  )
}

import { Button, Form, Input, Skeleton } from 'antd'
import Link from 'next/link'
import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
  useProcessEventRsvpTokenMutation,
} from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { EventCalendarLinks } from '../EventCalendarLinks'
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
  const [{ data, fetching: isSubmittingNotes }, updateTokenRSVPWithNotes] =
    useProcessEventRsvpTokenMutation()

  const handleSubmit = async (allValues: { notes?: string }) => {
    const notes = allValues.notes

    if (!notes || typeof token !== 'string') return

    updateTokenRSVPWithNotes({
      input: {
        notes,
        token,
      },
    })
  }

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
      {hasError ? (
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
      ) : event?.participationStatus ===
        EventParticipantStatus.USER_RSVP_DECLINED ? (
        <>
          <h1>Thank you!</h1>
          {!data?.processEventRSVPToken ? (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                key="notes"
                label="Let us know why you can not join"
                name="notes"
              >
                <Input.TextArea placeholder="e.g. time does not fit my calendar" />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isSubmittingNotes}
                  type="primary"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <p>We received your feedback.</p>
          )}

          <p>
            You can re-join anytime in our{' '}
            <Link href="/community/groups">app</Link>.
          </p>
        </>
      ) : event?.participationStatus ===
        EventParticipantStatus.USER_RSVP_ACCEPTED ? (
        <>
          <h1>Thank you!</h1>
          <p>
            We are looking forward to seeing you in the event. Please add the
            invite to the calendar of your choice:
          </p>
          <EventCalendarLinks event={event} />
        </>
      ) : null}
    </Skeleton>
  )
}

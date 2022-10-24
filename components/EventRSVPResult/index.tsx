import { Alert, Button, Form, Input, Select, Skeleton } from 'antd'
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

const DECLINE_OPTIONS = [
  {
    key: 'time',
    label:
      'Time: The format and topic are interesting, but the suggested time does not fit',
  },
  {
    key: 'sector',
    label:
      'Sector: The format is interesting, but I need a group focused on another sector',
  },
  {
    key: 'format',
    label: 'Format: This group format does not fit my needs',
  },
  {
    key: 'priority',
    label:
      'Priority: Climate action is not a priority for me/our company right now',
  },
  {
    key: 'other',
    label: 'Other',
  },
]

export const EventRSVPResult = ({
  event,
  hasError,
  isFetching,
  token,
}: EventRSVPResultProps) => {
  const [form] = Form.useForm<{ reason: string; notes: string }>()
  const reasonValue = Form.useWatch('reason', form)

  const [{ data, fetching: isSubmittingNotes }, updateTokenRSVPWithNotes] =
    useProcessEventRsvpTokenMutation()

  const handleSubmit = async (allValues: {
    notes?: string
    reason?: string
  }) => {
    const notes = `${allValues.reason} ${allValues.notes || ''}`

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
          <h1>Thanks for your response!</h1>
          <p style={{ marginBottom: '30px' }}>
            Please let us know why you declined the invitation to join this
            Mastermind Group. This will help us to improve our service and offer
            better solutions for you in the future.
          </p>
          {!data?.processEventRSVPToken ? (
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                key="reason"
                label="Reason for declining"
                name="reason"
                rules={[
                  {
                    message: 'Please select an option',
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select an option"
                  popupClassName="multi-row-options"
                >
                  {DECLINE_OPTIONS.map((option) => (
                    <Select.Option key={option.key}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {reasonValue === 'other' && (
                <Form.Item
                  key="notes"
                  label="Other"
                  name="notes"
                  rules={[
                    {
                      message: 'Please share why you can not join',
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea placeholder="e.g. time does not fit my calendar" />
                </Form.Item>
              )}

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
            <Alert
              message="We received your feedback."
              showIcon
              style={{ margin: '0 0 20px' }}
              type="success"
            />
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
      ) : (
        <>
          <h1>Missing event data</h1>
          <p>
            The link you are trying to open seems to be broken. If the problem
            persists, please contact us via{' '}
            <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
              {DEFAULT_SUPPORT_EMAIL}
            </a>{' '}
          </p>
        </>
      )}
    </Skeleton>
  )
}

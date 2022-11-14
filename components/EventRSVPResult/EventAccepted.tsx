import { Alert, Button, Collapse, Divider, Form, Input, message } from 'antd'
import React from 'react'

import {
  EventFragment,
  useProcessEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'

const { Panel } = Collapse

export const EventAccepted = ({
  event,
  token,
}: {
  event: EventFragment
  token?: string | string[]
}) => {
  const [
    { data: inviteData, error: inviteError, fetching: isInviting },
    inviteUserToEvent,
  ] = useProcessEventInviteTokenMutation()

  const handleSubmit = async ({ forwardEmail }: { forwardEmail?: string }) => {
    if (!forwardEmail || typeof token !== 'string') return

    const res = await inviteUserToEvent({
      input: {
        participantEmail: forwardEmail,
        token,
      },
    })

    if (res.error?.message) {
      message.error(res.error.message)
    }
  }

  return (
    <>
      <h1>Thank you!</h1>
      <p>
        We are looking forward to seeing you in the event. Please add the invite
        to the calendar of your choice:
      </p>
      <EventCalendarLinks event={event} />

      <Divider />

      <Collapse defaultActiveKey={['1']}>
        <Panel header="Would you like to invite someone else?" key={'1'}>
          <p>
            You can invite colleagues or other people from your network to join
            the event.
          </p>

          {!inviteData?.processEventInviteToken && !inviteError ? (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item key="forwardEmail" label="Email" name="forwardEmail">
                <Input placeholder="greta@thunbergvc.earth" type="email" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={isInviting} type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Alert
              message="Thanks! We will check and forward your invite."
              showIcon
              style={{ margin: '0 0 20px' }}
              type="success"
            />
          )}
        </Panel>
      </Collapse>
    </>
  )
}

import { Button, Form, Input, message } from 'antd'

import {
  EventFragment,
  EventParticipantStatus,
  useProcessEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'
import { EventMeta } from '../EventMeta'

interface EventSignUpProps {
  event: EventFragment
  mode?: string
  token: string
}

export const EventSignUp = ({ event, token }: EventSignUpProps) => {
  const [{ data, fetching }, processInviteToken] =
    useProcessEventInviteTokenMutation()

  const handleSubmit = ({ email }: { email: string }) => {
    processInviteToken({
      input: {
        participantEmail: email,
        token,
      },
    }).then((res) => {
      if (res.error) {
        message.error(res.error.message)
      }
    })
  }

  return data?.processEventInviteToken ? (
    <>
      {data.processEventInviteToken.participationStatus ===
      EventParticipantStatus.AWAITING_ADMIN_APPROVAL ? (
        <>
          <h1>Thanks!</h1>
          <p>
            We will review your event application. You will receive an event
            invitation with details to your email shortly.
          </p>
        </>
      ) : (
        <>
          <h1>Wonderful!</h1>
          <p>
            We are looking forward to seeing you at the event. Please add the
            invite to your calendar.
          </p>
          <EventCalendarLinks event={data.processEventInviteToken} />
        </>
      )}
    </>
  ) : (
    <div>
      <h1>{event.title}</h1>
      <p>To Sign up for this event, please enter your Email address below.</p>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Your Email"
          name="email"
          rules={[
            {
              message: 'Please add a valid email',
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input placeholder="nelson@impact.earth" type="email" />
        </Form.Item>
        <Form.Item>
          <Button
            block
            htmlType="submit"
            loading={fetching}
            size="large"
            type="primary"
          >
            Sign up for event
          </Button>
        </Form.Item>
      </Form>

      <EventMeta event={event} />
    </div>
  )
}

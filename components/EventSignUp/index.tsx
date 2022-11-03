import { Button, Form, Input, message } from 'antd'

import {
  EventFragment,
  EventParticipantStatus,
  useProcessEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'

interface EventSignUpProps {
  event: EventFragment
  token: string
}

export const EventSignUp = ({ event, token }: EventSignUpProps) => {
  const [{ data, fetching }, processInviteToken] =
    useProcessEventInviteTokenMutation()

  const handleSubmit = ({ email }: { email: string }) => {
    processInviteToken({
      input: {
        inviteParticipantEmail: email,
        inviteParticipantStatus: EventParticipantStatus.USER_RSVP_ACCEPTED,
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
      <h1>Success</h1>
      <EventCalendarLinks event={data.processEventInviteToken} />
    </>
  ) : (
    <div>
      <h1>Sign Up for {event.title}</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
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
    </div>
  )
}

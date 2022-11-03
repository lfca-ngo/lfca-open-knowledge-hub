import { Button, Collapse, Form, Input, message } from 'antd'

import {
  EventFragment,
  EventParticipantStatus,
  useProcessEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'
import { Recurrence, Status } from '../EventCard/EventMeta'
import { MarkdownContent } from '../MarkdownContent'

interface EventSignUpProps {
  event: EventFragment
  token: string
}

const { Panel } = Collapse

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
      <h1>Wonderful!</h1>
      <p>
        We are looking forward to seeing you at the event. Please add the invite
        to your calendar.
      </p>
      <EventCalendarLinks event={data.processEventInviteToken} />
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

        <Form.Item label="Event Details">
          <Collapse accordion>
            <Panel header="Time & Date" key="time">
              <Recurrence event={event} />
              <Status event={event} />
            </Panel>
            <Panel header="Event Description" key="details">
              <MarkdownContent content={event?.description || ''} />
            </Panel>
          </Collapse>
        </Form.Item>
      </Form>
    </div>
  )
}

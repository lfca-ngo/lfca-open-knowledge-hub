import { Button, Form, List, message } from 'antd'
import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
  useAddEventParticipantMutation,
  useEventParticipantsQuery,
} from '../../services/lfca-backend'
import { UserIdSearchInput } from '../UserIdSearchInput'
import { AdminEventParticipantItem } from './AdminEventParticipantItem'

interface ParticipantsListProps {
  event: EventFragment
}

export const AdminEventParticipants = ({ event }: ParticipantsListProps) => {
  const [form] = Form.useForm()

  const [{ data, fetching: fetchingParticipants }] = useEventParticipantsQuery({
    pause: !event.id,
    variables: {
      input: {
        eventId: event.id,
      },
    },
  })

  const [{ fetching: fetchingAddEventParticipant }, addEventParticipant] =
    useAddEventParticipantMutation()

  const handleAdd = async ({ userId }: { userId?: string }) => {
    const res = await addEventParticipant({
      input: {
        eventId: event.id,
        status: EventParticipantStatus.AWAITING_USER_RSVP,
        userId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      form.resetFields()
    }
  }

  return (
    <>
      <div>
        <h1>{event?.title}</h1>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            label="Invite a specific user to this event"
            name="userId"
            rules={[{ message: 'Please select a user', required: true }]}
          >
            <UserIdSearchInput />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={fetchingAddEventParticipant}
              type="primary"
            >
              Invite
            </Button>
          </Form.Item>
        </Form>
        <List
          dataSource={data?.eventParticipants || []}
          itemLayout="horizontal"
          loading={fetchingParticipants}
          renderItem={(participant) => (
            <AdminEventParticipantItem
              eventId={event.id}
              participant={participant}
            />
          )}
        />
      </div>
    </>
  )
}

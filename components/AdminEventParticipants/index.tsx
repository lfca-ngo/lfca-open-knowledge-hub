import { Button, Form, Input, List, message } from 'antd'
import React from 'react'

import {
  EventFragment,
  EventParticipantStatus,
  useAddEventParticipantMutation,
  useAddExternalEventParticipantMutation,
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
  const [
    { fetching: fetchingAddExternalEventParticipant },
    addExternalEventParticipant,
  ] = useAddExternalEventParticipantMutation()

  const handleAdd = async ({
    externalUserEmail,
    userId,
  }: {
    externalUserEmail?: string
    userId?: string
  }) => {
    let errorMessage: string | undefined

    if (userId) {
      const res = await addEventParticipant({
        input: {
          eventId: event.id,
          status: EventParticipantStatus.AWAITING_USER_RSVP,
          userId,
        },
      })

      errorMessage = res.error?.message
    } else if (externalUserEmail) {
      const res = await addExternalEventParticipant({
        input: {
          eventId: event.id,
          externalUserEmail,
          status: EventParticipantStatus.AWAITING_USER_RSVP,
        },
      })

      errorMessage = res.error?.message
    }

    if (errorMessage) {
      message.error(errorMessage)
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
            dependencies={['externalUserEmail']}
            label="Invite a specific community member"
            name="userId"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    (!value && !getFieldValue('externalUserEmail')) ||
                    (value && getFieldValue('externalUserEmail'))
                  ) {
                    return Promise.reject(
                      new Error(
                        'Select a community member OR enter an external email!'
                      )
                    )
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <UserIdSearchInput />
          </Form.Item>

          <Form.Item
            dependencies={['userId']}
            key="externalUserEmail"
            label="or invite an external user to this event"
            name="externalUserEmail"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    (!value && !getFieldValue('userId')) ||
                    (value && getFieldValue('userId'))
                  ) {
                    return Promise.reject(
                      new Error(
                        'Select a community member OR enter an external email!'
                      )
                    )
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input placeholder="greta@thunbergvc.earth" type="email" />
          </Form.Item>

          <Form.Item
            extra={
              'NOTE: adding a user that is already a participant will set the status back to "Awaiting RSVP" and resend the RSVP email.'
            }
          >
            <Button
              htmlType="submit"
              loading={
                fetchingAddEventParticipant ||
                fetchingAddExternalEventParticipant
              }
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

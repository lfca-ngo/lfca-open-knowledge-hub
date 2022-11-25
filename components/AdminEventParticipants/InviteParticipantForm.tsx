import { Button, Form, Input, message } from 'antd'
import React from 'react'

import {
  EventParticipantFragment,
  EventParticipantStatus,
  useAddEventParticipantMutation,
  useAddExternalEventParticipantMutation,
} from '../../services/lfca-backend'
import { UserIdSearchInput } from '../UserIdSearchInput'

interface InviteParticipantFormProps {
  eventId: string
  existingParticipants?: EventParticipantFragment[]
}

export const InviteParticipantForm = ({
  eventId,
  existingParticipants,
}: InviteParticipantFormProps) => {
  const [form] = Form.useForm()

  const [{ fetching: fetchingAddEventParticipant }, addEventParticipant] =
    useAddEventParticipantMutation()

  const [
    { fetching: fetchingAddExternalEventParticipant },
    addExternalEventParticipant,
  ] = useAddExternalEventParticipantMutation()

  const handleAlreadyInvitedUser = () =>
    message.error('Selected user is already invited')

  const handleSubmit = async ({
    externalUserEmail,
    userId,
  }: {
    externalUserEmail?: string
    userId?: string
  }) => {
    let errorMessage: string | undefined

    if (userId) {
      // check if participant is already invited
      const isAlreadyInvited = !!existingParticipants?.find(
        (p) => p.user.id === userId
      )
      if (isAlreadyInvited) return handleAlreadyInvitedUser()

      const res = await addEventParticipant({
        input: {
          eventId,
          status: EventParticipantStatus.AWAITING_USER_RSVP,
          userId,
        },
      })

      errorMessage = res.error?.message
    } else if (externalUserEmail) {
      // check if external participant is already invited
      const isAlreadyInvited = !!existingParticipants?.find(
        (p) => p.user.email === externalUserEmail
      )
      if (isAlreadyInvited) return handleAlreadyInvitedUser()

      const res = await addExternalEventParticipant({
        input: {
          eventId,
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
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

      <Form.Item>
        <Button
          htmlType="submit"
          loading={
            fetchingAddEventParticipant || fetchingAddExternalEventParticipant
          }
          type="primary"
        >
          Invite
        </Button>
      </Form.Item>
    </Form>
  )
}

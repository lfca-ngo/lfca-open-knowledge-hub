import { Button, Checkbox, Form, Input, message, Radio, Space } from 'antd'
import React from 'react'

import {
  EventParticipantStatus,
  useMessageEventParticipantsMutation,
} from '../../services/lfca-backend'

interface MessageParticipantsFormProps {
  eventId: string
  onSuccess: () => void
}

export const MessageParticipantsForm = ({
  eventId,
  onSuccess,
}: MessageParticipantsFormProps) => {
  const [form] = Form.useForm()

  const [{ fetching: sendingMessage }, messageEventParticipants] =
    useMessageEventParticipantsMutation()

  const handleSubmit = async ({
    body,
    includeAddToCalendarBtn,
    includeJoinCallBtn,
    status,
    subject,
  }: {
    subject?: string
    body: string
    includeAddToCalendarBtn: boolean
    includeJoinCallBtn: boolean
    status?: EventParticipantStatus
  }) => {
    const res = await messageEventParticipants({
      input: {
        eventId,
        filter: {
          status,
        },
        includeAddToCalendarBtn,
        includeJoinCallBtn,
        message: body,
        subject,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('Message has been sent.')
      form.resetFields()
      onSuccess()
    }
  }

  return (
    <Form
      form={form}
      initialValues={{
        status: EventParticipantStatus.USER_RSVP_ACCEPTED,
      }}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item label="Subject (optional)" name="subject">
        <Input placeholder="Event title is used if none is provided" />
      </Form.Item>

      <Form.Item
        label="Message"
        name="body"
        rules={[{ message: 'Please write a message!', required: true }]}
      >
        <Input.TextArea placeholder="Type here..." />
      </Form.Item>

      <Form.Item label="Participant status" name="status">
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={EventParticipantStatus.USER_RSVP_ACCEPTED}>
              RSVP Accepted
            </Radio>
            <Radio value={EventParticipantStatus.USER_RSVP_DECLINED}>
              RSVP Declined
            </Radio>
            <Radio value={EventParticipantStatus.AWAITING_USER_RSVP}>
              Awaiting user RSVP
            </Radio>
            <Radio value={EventParticipantStatus.AWAITING_ADMIN_APPROVAL}>
              Awaiting admin approval
            </Radio>
            <Radio value={undefined}>All</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="includeAddToCalendarBtn"
        style={{ marginBottom: 0 }}
        valuePropName="checked"
      >
        <Checkbox>
          Include <b>&quot;Add to calendar&quot;</b> CTA
        </Checkbox>
      </Form.Item>

      <Form.Item name="includeJoinCallBtn" valuePropName="checked">
        <Checkbox>
          Include <b>&quot;Join call&quot;</b> CTA
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" loading={sendingMessage} type="primary">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}

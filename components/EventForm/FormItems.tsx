import { DatePicker, Form, FormInstance, Input, Radio, Space } from 'antd'

import { EventParticipantStatus } from '../../services/lfca-backend'
import { RecurrenceRuleInput } from '../RecurrenceRuleInput'
import { RichTextInput } from '../RichTextInput'
import { FormValues } from '.'

interface FormItemsProps {
  form: FormInstance
}

export const FormItems = ({}: FormItemsProps) => {
  /* eslint-disable sort-keys */
  const formItems: { [key in keyof FormValues]: React.ReactNode } = {
    title: (
      <Form.Item
        key="title"
        label="Group title"
        name="title"
        rules={[{ message: 'Please enter a group title!', required: true }]}
      >
        <Input placeholder="Group XYZ" />
      </Form.Item>
    ),
    startEnd: (
      <Form.Item
        key="startEnd"
        label="Start/End date & time of the 1st event"
        name="startEnd"
        rules={[{ message: 'Please enter a time range!', required: true }]}
      >
        <DatePicker.RangePicker
          format="YYYY-MM-DD HH:mm"
          showTime={{
            format: 'HH:mm',
            minuteStep: 5,
          }}
        />
      </Form.Item>
    ),
    recurrenceRule: (
      <Form.Item
        key="recurrenceRule"
        label="Repeat"
        name="recurrenceRule"
        rules={[
          { message: 'Please choose a repetition cycle!', required: true },
        ]}
      >
        <RecurrenceRuleInput />
      </Form.Item>
    ),
    description: (
      <Form.Item key="description" label="Description" name="description">
        <RichTextInput placeholder="Description of the group" />
      </Form.Item>
    ),
    videoConferenceUrl: (
      <Form.Item
        key="videoConferenceUrl"
        label="Video conference URL"
        name="videoConferenceUrl"
      >
        <Input placeholder="https://example.com/" type="url" />
      </Form.Item>
    ),
    initialInviteStatus: (
      <Form.Item
        key="initialInviteStatus"
        label="Invites need admin approval?"
        name="initialInviteStatus"
        rules={[
          {
            message: 'Please select an option',
            required: true,
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={EventParticipantStatus.USER_RSVP_ACCEPTED}>
              Direct Sign Up
              <br />
              <i>(User will receive a confirmation email after signup)</i>
            </Radio>
            <Radio value={EventParticipantStatus.AWAITING_ADMIN_APPROVAL}>
              Require Admin Approval
              <br />
              <i>(User will receive an RSVP email after approval)</i>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    ),
  }
  /* eslint-enable sort-keys */

  return (
    <>
      {Object.keys(formItems).map((key) => formItems[key as keyof FormValues])}
    </>
  )
}

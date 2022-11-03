import { Alert, Button, Form, Input, message, Select } from 'antd'
import Link from 'next/link'

import { useProcessEventRsvpTokenMutation } from '../../services/lfca-backend'

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

export const EventDeclined = ({ token }: { token?: string | string[] }) => {
  const [form] = Form.useForm<{
    reason: string
    notes: string
    forwardEmail: string
  }>()
  const reasonValue = Form.useWatch('reason', form)

  const [{ data, fetching: isSubmittingNotes }, updateTokenRSVPWithNotes] =
    useProcessEventRsvpTokenMutation()

  const handleSubmit = async ({
    forwardEmail,
    notes,
    reason,
  }: {
    forwardEmail?: string
    notes?: string
    reason?: string
  }) => {
    if ((!reason && !forwardEmail) || typeof token !== 'string') return

    const notesText = `${reason} ${notes || ''}`

    const res = await updateTokenRSVPWithNotes({
      input: {
        forwardEmail,
        notes: notesText,
        token,
      },
    })

    if (res.error?.message) {
      message.error(res.error.message)
    }
  }

  return (
    <>
      <h1>Thanks for your response!</h1>
      <p style={{ marginBottom: '30px' }}>
        Please let us know why you declined the invitation to join this Event.
        This will help us to improve our service and offer better solutions for
        you in the future.
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
                <Select.Option key={option.key}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {reasonValue === 'other' && (
            <Form.Item
              key="notes"
              label="Let us know why you can not join"
              name="notes"
            >
              <Input.TextArea placeholder="e.g. time does not fit my calendar" />
            </Form.Item>
          )}

          <Form.Item
            key="forwardEmail"
            label="Invite a colleague (optional)"
            name="forwardEmail"
          >
            <Input placeholder="greta@thunbergvc.earth" type="email" />
          </Form.Item>

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
        You can re-join anytime in our <Link href="/community/groups">app</Link>
        .
      </p>
    </>
  )
}

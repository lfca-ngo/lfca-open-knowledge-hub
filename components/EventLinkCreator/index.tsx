import { CopyOutlined } from '@ant-design/icons'
import { Button, Collapse, Form, Input, message, Radio, Space } from 'antd'

import {
  EventParticipantStatus,
  useCreateEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { COPY_BTN_WIDTH, copyTextToClipboard } from '../../utils'
import styles from './styles.module.less'

const { Panel } = Collapse
const { useForm, useWatch } = Form

export enum InviteMode {
  DIRECT = 'direct',
  ADMIN = 'admin',
}

interface PublicEventLinkProps {
  eventId: string
}

export const EventLinkCreator = ({ eventId }: PublicEventLinkProps) => {
  const [eventLinkForm] = useForm()
  const selectedEventStatus = useWatch('eventStatus', eventLinkForm)
  const inviteMode =
    selectedEventStatus === EventParticipantStatus.USER_RSVP_ACCEPTED
      ? InviteMode.DIRECT
      : InviteMode.ADMIN

  const [{ data, fetching }, createEventInviteToken] =
    useCreateEventInviteTokenMutation()

  const link = data?.createEventInviteToken
    ? `${process.env.NEXT_PUBLIC_URL}/events/${eventId}/signup?token=${data?.createEventInviteToken}&mode=${inviteMode}`
    : ''

  const handleCopy = () => {
    link &&
      copyTextToClipboard(link, (note: string, hasCopied: boolean) => {
        if (hasCopied) {
          message.success(note)
        } else message.error(note)
      })
  }

  const handleCreate = ({
    eventStatus,
  }: {
    eventStatus: EventParticipantStatus
  }) => {
    createEventInviteToken({
      input: {
        allowedInviteParticipantStatus: [eventStatus],
        eventId,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Event link created')
    })
  }

  return (
    <div className={styles['event-link-creator']}>
      <Collapse>
        <Panel header="Generate an open event sign up link" key="1">
          <Form
            form={eventLinkForm}
            initialValues={{
              eventStatus: EventParticipantStatus.USER_RSVP_ACCEPTED,
            }}
            layout="vertical"
            onFinish={handleCreate}
          >
            <Form.Item
              label="Choose an option"
              name="eventStatus"
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
                  </Radio>
                  <Radio value={EventParticipantStatus.AWAITING_ADMIN_APPROVAL}>
                    Require Admin Approval
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" loading={fetching} type="primary">
                Generate sign up link
              </Button>
            </Form.Item>
            <Form.Item>
              <Input.Group compact>
                <Input
                  disabled
                  placeholder="Click the button to create a link"
                  style={{ width: `calc(100% - ${COPY_BTN_WIDTH}px` }}
                  value={link}
                />
                <Button
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
                  style={{ width: `${COPY_BTN_WIDTH}px` }}
                />
              </Input.Group>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  )
}

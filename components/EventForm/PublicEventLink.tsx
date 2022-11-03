import { CopyOutlined } from '@ant-design/icons'
import { Button, Collapse, Input, message, Space } from 'antd'

import {
  EventParticipantStatus,
  useCreateEventInviteTokenMutation,
} from '../../services/lfca-backend'
import { COPY_BTN_WIDTH, copyTextToClipboard } from '../../utils'
import styles from './styles.module.less'

const { Panel } = Collapse

interface PublicEventLinkProps {
  eventId: string
}

export const PublicEventLink = ({ eventId }: PublicEventLinkProps) => {
  const [{ data, fetching }, createEventInviteToken] =
    useCreateEventInviteTokenMutation()

  const link = data?.createEventInviteToken
    ? `https://app.lfca.earth/events/${eventId}/signup?token=${data?.createEventInviteToken}`
    : ''

  const handleCopy = () => {
    link &&
      copyTextToClipboard(link, (note: string, hasCopied: boolean) => {
        if (hasCopied) {
          message.success(note)
        } else message.error(note)
      })
  }

  const handleCreate = () => {
    createEventInviteToken({
      input: {
        allowedInviteParticipantStatus: [
          EventParticipantStatus.USER_RSVP_ACCEPTED,
        ],
        eventId,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Event link created')
    })
  }

  return (
    <div className={styles['public-event-link']}>
      <Collapse>
        <Panel header="Generate an open event sign up link" key="1">
          <div className="link-details-title">Link Details</div>
          <ul>
            <li>everybody with this link can sign up to the event</li>
            <li>
              {`people who sign up are automatically added as "approved" and will
              receive a confirmation email`}
            </li>
          </ul>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button
              block
              loading={fetching}
              onClick={handleCreate}
              type="primary"
            >
              Generate sign up link
            </Button>

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
          </Space>
        </Panel>
      </Collapse>
    </div>
  )
}

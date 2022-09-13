import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'

import {
  EventFragment,
  EventParticipationStatus,
} from '../../services/lfca-backend'
import { Recurrence, Status, Time } from './EventMeta'

export interface EventCardDefaultProps {
  event: EventFragment
  onClick: () => void
  onClose: () => void
}

import { LogoGroup } from '../LogoGroup'

export const EventCardCompact = ({ event, onClick }: EventCardDefaultProps) => {
  const eventIsApproved =
    event.participationRequestStatus === EventParticipationStatus.APPROVED

  return (
    <div className="event-card compact" onClick={onClick}>
      <div className="header">
        <div className="summary">
          <div className="title">{event.title}</div>
          <div className="info">
            <div className="event-meta">
              <Space direction="vertical" size="large">
                <Status event={event} />
                <Time event={event} />
                <Recurrence event={event} />
              </Space>
            </div>

            <div className="participants">
              <LogoGroup
                data={event?.participationRequests.map((r) => r?.user?.company)}
                maxCount={5}
                size={35}
              />
            </div>

            <div className="actions">
              {eventIsApproved && event.videoConferenceUrl && (
                <a
                  href={event.videoConferenceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button
                    block
                    icon={<VideoCameraAddOutlined />}
                    type="primary"
                  >
                    Join meeting
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

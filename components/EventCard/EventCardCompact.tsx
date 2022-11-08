import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'

import { EventParticipantStatus } from '../../services/lfca-backend'
import { LogoGroup } from '../LogoGroup'
import { EventCardDefaultProps } from '.'
import { Recurrence, Status, Time } from './EventMeta'
import styles from './styles.module.less'
import { getUniqueParticipatingCompanies } from './utils'

export const EventCardCompact = ({ event, onClick }: EventCardDefaultProps) => {
  const eventIsApproved =
    event.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED

  return (
    <div className={styles['event-card-compact']} onClick={onClick}>
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
            data={getUniqueParticipatingCompanies(event)}
            maxCount={5}
            size={35}
          />
        </div>

        <div className="actions" onClick={(e) => e.stopPropagation()}>
          {eventIsApproved && event.videoConferenceUrl && (
            <a href={event.videoConferenceUrl} rel="noreferrer" target="_blank">
              <Button block icon={<VideoCameraAddOutlined />} type="primary">
                Join meeting
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

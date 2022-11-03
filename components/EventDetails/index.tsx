import { Avatar, Card, Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { Recurrence, Status } from '../EventCard/EventMeta'
import {
  getUniqueParticipatingCompanies,
  matchStringToIcon,
} from '../EventCard/utils'
import styles from './styles.module.less'

export interface EventCardDefaultProps {
  event: EventFragment
}

import { LogoGroup } from '../LogoGroup'

export const EventDetails = ({ event }: EventCardDefaultProps) => {
  return (
    <Card className={styles['event-card-large']}>
      <div className="header">
        <div className="icon">
          <Avatar
            className="wine-inverse"
            icon={matchStringToIcon(event.title)}
            shape="square"
            size={90}
          />
        </div>
        <div className="summary">
          <div className="title">{event.title}</div>
          <div className="info">
            <div className="event-meta">
              <Space size="large">
                <Status event={event} />
                <Recurrence event={event} />
              </Space>
            </div>
            <div className="participants">
              <LogoGroup
                data={getUniqueParticipatingCompanies(event)}
                maxCount={10}
                size={35}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

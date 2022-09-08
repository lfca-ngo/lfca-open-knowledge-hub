import { Card, Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { Recurrence, Status } from './EventMeta'

export interface EventCardDefaultProps {
  event: EventFragment
  onClick: () => void
  onClose: () => void
}

import { LogoGroup } from '../LogoGroup'

export const EventCardCompact = ({ event, onClick }: EventCardDefaultProps) => {
  return (
    <>
      <Card className="event-card compact" hoverable onClick={onClick}>
        <div className="header">
          <div className="summary">
            <div className="title">{event.title}</div>
            <div className="info">
              <div className="event-meta">
                <Space direction="vertical" size="large">
                  <Status event={event} />
                  <Recurrence event={event} />
                </Space>
              </div>
              <div className="participants">
                <LogoGroup
                  data={event?.participationRequests.map(
                    (r) => r?.user?.company
                  )}
                  size={35}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

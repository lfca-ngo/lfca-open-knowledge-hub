import { HourglassOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, message, Space } from 'antd'

import {
  EventFragment,
  useCreateEventParticipationRequestMutation,
} from '../../services/lfca-backend'
import { Recurrence, Status } from './EventMeta'
import { matchStringToIcon } from './utils'

export interface EventCardDefaultProps {
  event: EventFragment
  onClick: () => void
  onClose: () => void
}

import { LogoGroup } from '../LogoGroup'

export const EventCardDefault = ({ event, onClick }: EventCardDefaultProps) => {
  const [{ fetching }, createEventParticipationRequest] =
    useCreateEventParticipationRequestMutation()

  const handleJoin = async () => {
    const res = await createEventParticipationRequest({
      input: {
        eventId: event.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('We will notify you once your spot is confirmed')
    }
  }

  return (
    <>
      <Card className="event-card default" hoverable onClick={onClick}>
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
                  data={event?.participationRequests.map(
                    (r) => r?.user?.company
                  )}
                  size={35}
                />
              </div>
            </div>
          </div>
          <div className="actions">
            <Space>
              <Button
                disabled={event.participationRequestStatus === 'PENDING'}
                icon={
                  event.participationRequestStatus === 'PENDING' ? (
                    <HourglassOutlined />
                  ) : (
                    <UserAddOutlined />
                  )
                }
                loading={fetching}
                onClick={handleJoin}
                type="primary"
              >
                {event.participationRequestStatus === 'PENDING'
                  ? 'Pending'
                  : 'Join'}
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </>
  )
}

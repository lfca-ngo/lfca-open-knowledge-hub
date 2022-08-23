require('./styles.less')

import { HourglassOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Divider, message, Modal, Space } from 'antd'
import { useState } from 'react'

import {
  EventFragment,
  useCreateEventParticipationRequestMutation,
} from '../../services/lfca-backend'
import { EventMeta } from './EventMeta'

export interface EventCardProps {
  event: EventFragment
  compact?: boolean
}

export const EventCard = ({ compact, event }: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)

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
      <Card className="event-card">
        <div className="header">
          <div className="title">{event.title}</div>
          <div className="actions">
            {!compact && (
              <Space>
                <Button onClick={() => setDetailsVisible(true)} type="ghost">
                  Details
                </Button>

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
            )}
          </div>
        </div>

        <Divider />

        <EventMeta compact={compact} event={event} />

        {compact && (
          <Button onClick={() => setDetailsVisible(true)} type="ghost">
            Details
          </Button>
        )}
      </Card>

      <Modal
        closable
        footer={[
          <Button
            key="modalOk"
            onClick={() => setDetailsVisible(false)}
            type="primary"
          >
            OK
          </Button>,
        ]}
        title={event.title}
        visible={detailsVisible}
        wrapClassName="modal-md"
      >
        <EventMeta event={event} />

        <Divider />

        {event.description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: event.description,
            }}
          />
        ) : (
          <p>No description available.</p>
        )}
      </Modal>
    </>
  )
}

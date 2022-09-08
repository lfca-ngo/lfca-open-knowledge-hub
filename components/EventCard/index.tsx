require('./styles.less')
import { Button, Divider, Modal, Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import {
  ParticipationRequestsApproved,
  ParticipationRequestsPending,
  Recurrence,
  Status,
} from './EventMeta'

export interface EventCardProps {
  event: EventFragment
  type?: 'compact' | 'default'
}

import { useState } from 'react'

import { EventCardCompact } from './EventCardCompact'
import { EventCardDefault } from './EventCardDefault'

export const EventCard = ({ event, type }: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)

  const renderCard = () => {
    switch (type) {
      case 'compact':
        return (
          <EventCardCompact
            event={event}
            onClick={() => setDetailsVisible(true)}
            onClose={() => setDetailsVisible(false)}
          />
        )
      default:
        return (
          <EventCardDefault
            event={event}
            onClick={() => setDetailsVisible(true)}
            onClose={() => setDetailsVisible(false)}
          />
        )
    }
  }

  return (
    <>
      {renderCard()}
      <Modal
        className="event-card-modal modal-md"
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
        onCancel={() => setDetailsVisible(false)}
        visible={detailsVisible}
        wrapClassName="modal-md"
      >
        <div className="event-title">{event.title}</div>
        <div className="event-meta">
          <Space direction="vertical" size="large">
            <Status event={event} />
            <Recurrence event={event} />
            <ParticipationRequestsApproved event={event} />
            <ParticipationRequestsPending event={event} />
          </Space>
        </div>

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

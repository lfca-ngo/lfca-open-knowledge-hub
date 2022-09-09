require('./styles.less')
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import {
  ParticipationRequestsApproved,
  ParticipationRequestsPending,
  Recurrence,
  Status,
  Time,
} from './EventMeta'

export interface EventCardProps {
  event: EventFragment
  appliedEventsCount: number
  participatingEventsCount: number
  type?: 'compact' | 'default'
}

import { useState } from 'react'

import { LogoGroup } from '../LogoGroup'
import { EventCardCompact } from './EventCardCompact'
import { EventCardDefault } from './EventCardDefault'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'

export const EventCard = ({
  appliedEventsCount,
  event,
  participatingEventsCount,
  type,
}: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  const eventIsApproved = event.participationRequestStatus === 'APPROVED'
  const isParticipatingAtLeastOneEvent = participatingEventsCount > 0
  const hasAppliedForAtLeastOneEvent = appliedEventsCount > 0

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
            hasAppliedForAtLeastOneEvent={hasAppliedForAtLeastOneEvent}
            isParticipatingAtLeastOneEvent={isParticipatingAtLeastOneEvent}
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
          <Button key="modalOk" onClick={() => setDetailsVisible(false)}>
            OK
          </Button>,
        ]}
        onCancel={() => setDetailsVisible(false)}
        visible={detailsVisible}
        wrapClassName="modal-md"
      >
        <div className="event-title">{event.title}</div>
        <Divider />
        <div className="event-meta">
          <Space direction="vertical" size="large">
            <Status event={event} />
            <Time event={event} />
            <Recurrence event={event} />
            <ParticipationRequestsApproved event={event} />
            <ParticipationRequestsPending event={event} />
            <LogoGroup
              data={event?.participationRequests.map((r) => r?.user?.company)}
              size={60}
            />
          </Space>
        </div>

        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          {eventIsApproved && event.videoConferenceUrl && (
            <a href={event.videoConferenceUrl} rel="noreferrer" target="_blank">
              <Button block icon={<VideoCameraAddOutlined />} type="primary">
                Join meeting
              </Button>
            </a>
          )}
          <ToggleSubscribeButton
            buttonProps={{
              block: true,
              disabled:
                hasAppliedForAtLeastOneEvent &&
                event.participationRequestStatus !== 'APPROVED',
            }}
            event={event}
            key="toggle-subscribe"
          />
        </Space>

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

import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, Space } from 'antd'

import {
  EventFragment,
  EventParticipantStatus,
} from '../../services/lfca-backend'
import {
  ParticipationRequestsApproved,
  ParticipationRequestsPending,
  Recurrence,
  Status,
  Time,
} from './EventMeta'
import styles from './styles.module.less'

export interface EventCardProps {
  event: EventFragment
  appliedEventsCount: number
  participatingEventsCount: number
  type?: 'compact' | 'default'
}

import classNames from 'classnames'
import { useState } from 'react'

import { LogoGroup } from '../LogoGroup'
import { EventCardCompact } from './EventCardCompact'
import { EventCardDefault } from './EventCardDefault'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'
import { getUniqueParticipatingCompanies } from './utils'

export const EventCard = ({
  appliedEventsCount,
  event,
  participatingEventsCount,
  type,
}: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  const eventIsApproved =
    event.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED
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
        className={classNames(styles['event-card-modal'], 'modal-md')}
        closable
        footer={[
          <Button key="modalOk" onClick={() => setDetailsVisible(false)}>
            OK
          </Button>,
        ]}
        onCancel={() => setDetailsVisible(false)}
        open={detailsVisible}
        wrapClassName="modal-md"
      >
        <div className="event-title">{event.title}</div>
        <Divider />
        <div className={styles['event-meta']}>
          <Space direction="vertical" size="large">
            <Status event={event} />
            <Time event={event} />
            <Recurrence event={event} />
            <ParticipationRequestsApproved event={event} />
            <ParticipationRequestsPending event={event} />
            <LogoGroup
              data={getUniqueParticipatingCompanies(event)}
              maxCount={10}
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
                event.participationStatus !==
                  EventParticipantStatus.USER_RSVP_ACCEPTED,
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

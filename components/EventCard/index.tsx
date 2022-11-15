import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, Space } from 'antd'

import {
  EventParticipantStatus,
  EventWithParticipantsFragment,
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
  event: EventWithParticipantsFragment
  appliedEventsCount: number
  participatingEventsCount: number
  statusOnJoin?: EventParticipantStatus
  type?: 'compact' | 'default' | 'small'
}

import classNames from 'classnames'
import { useState } from 'react'

import { EventCalendarLinks } from '../EventCalendarLinks'
import { LogoGroup } from '../LogoGroup'
import { MarkdownContent } from '../MarkdownContent'
import { EventCardCompact } from './EventCardCompact'
import { EventCardDefault } from './EventCardDefault'
import { EventCardSmall } from './EventCardSmall'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'
import { getUniqueParticipatingCompanies } from './utils'

export interface EventCardDefaultProps {
  event: EventWithParticipantsFragment
  onClick: () => void
  onClose: () => void
  statusOnJoin?: EventParticipantStatus
}

export const EventCard = ({
  appliedEventsCount,
  event,
  participatingEventsCount,
  statusOnJoin,
  type,
}: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  const eventIsApproved =
    event.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED
  const eventIsPending =
    event.participationStatus === EventParticipantStatus.AWAITING_ADMIN_APPROVAL
  const isParticipatingAtLeastOneEvent = participatingEventsCount > 0
  const hasAppliedForAtLeastOneEvent = appliedEventsCount > 0

  const renderCard = () => {
    switch (type) {
      case 'small':
        return (
          <EventCardSmall
            event={event}
            hasAppliedForAtLeastOneEvent={hasAppliedForAtLeastOneEvent}
            isParticipatingAtLeastOneEvent={isParticipatingAtLeastOneEvent}
            onClick={() => setDetailsVisible(true)}
            onClose={() => setDetailsVisible(false)}
            statusOnJoin={statusOnJoin}
          />
        )
      case 'compact':
        return (
          <EventCardCompact
            event={event}
            onClick={() => setDetailsVisible(true)}
            onClose={() => setDetailsVisible(false)}
            statusOnJoin={statusOnJoin}
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
            statusOnJoin={statusOnJoin}
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
            <ParticipationRequestsApproved event={event} minApprovedCount={5} />
            <ParticipationRequestsPending event={event} minApprovedCount={5} />
            <LogoGroup
              data={getUniqueParticipatingCompanies(event)}
              maxCount={10}
              size={40}
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

          {eventIsApproved ? (
            <>
              <EventCalendarLinks event={event} />
              <Divider />
            </>
          ) : null}

          <ToggleSubscribeButton
            buttonProps={{
              block: true,
              disabled:
                (hasAppliedForAtLeastOneEvent && !eventIsPending) ||
                (isParticipatingAtLeastOneEvent && !eventIsApproved),
              size: 'large',
            }}
            event={event}
            key="toggle-subscribe"
            statusOnJoin={statusOnJoin}
          />
        </Space>

        <Divider />

        {event.description ? (
          <MarkdownContent content={event.description} />
        ) : (
          <p>No description available.</p>
        )}
      </Modal>
    </>
  )
}

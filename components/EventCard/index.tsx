import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, Space } from 'antd'

import {
  EventParticipantStatus,
  EventWithParticipantsFragment,
} from '../../services/lfca-backend'
import { Recurrence, Status, Time } from '../EventMeta'
import {
  ParticipationCountAwaitingAdminApproval,
  ParticipationCountRSVPAccepted,
} from './ParticipationCount'
import styles from './styles.module.less'

export interface EventCardProps {
  event: EventWithParticipantsFragment
  isAllowedToJoin: boolean
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
}

export const EventCard = ({ event, isAllowedToJoin, type }: EventCardProps) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  const eventIsApproved =
    event.participationStatus === EventParticipantStatus.USER_RSVP_ACCEPTED
  const eventIsPending =
    event.participationStatus === EventParticipantStatus.AWAITING_ADMIN_APPROVAL
  const canUpdateEventStatus =
    isAllowedToJoin || eventIsPending || eventIsApproved

  const renderCard = () => {
    switch (type) {
      case 'small':
        return (
          <EventCardSmall
            canUpdateEventStatus={canUpdateEventStatus}
            event={event}
            onClick={() => setDetailsVisible(true)}
            onClose={() => setDetailsVisible(false)}
          />
        )
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
            canUpdateEventStatus={canUpdateEventStatus}
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
            <ParticipationCountRSVPAccepted event={event} minCount={5} />
            <ParticipationCountAwaitingAdminApproval
              event={event}
              minCount={5}
            />
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
              <Button
                block
                icon={<VideoCameraAddOutlined />}
                size="large"
                type="primary"
              >
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
              disabled: !canUpdateEventStatus,
              size: 'large',
            }}
            event={event}
            key="toggle-subscribe"
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

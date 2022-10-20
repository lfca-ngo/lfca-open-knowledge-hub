import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Card, Space } from 'antd'

import {
  EventFragment,
  EventParticipantStatus,
} from '../../services/lfca-backend'
import { Recurrence, Status } from './EventMeta'
import styles from './styles.module.less'
import { getUniqueParticipatingCompanies, matchStringToIcon } from './utils'

export interface EventCardDefaultProps {
  event: EventFragment
  onClick: () => void
  onClose: () => void
  hasAppliedForAtLeastOneEvent: boolean
  isParticipatingAtLeastOneEvent: boolean
}

import { useState } from 'react'

import { LogoGroup } from '../LogoGroup'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'

export const EventCardDefault = ({
  event,
  hasAppliedForAtLeastOneEvent,
  isParticipatingAtLeastOneEvent,
  onClick,
}: EventCardDefaultProps) => {
  const isPending =
    event.participationStatus === EventParticipantStatus.AWAITING_ADMIN_APPROVAL
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isHovered) setIsHovered(false)
  }

  return (
    <Card
      className={styles['event-card-default']}
      hoverable
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header">
        <div className="icon">
          <Avatar
            className="wine-inverse"
            icon={
              isHovered ? (
                <span className="hover-view">
                  <EyeOutlined />
                  <span className="text">view details</span>
                </span>
              ) : (
                matchStringToIcon(event.title)
              )
            }
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
        <div className="actions" onClick={(e) => e.stopPropagation()}>
          <Space>
            <ToggleSubscribeButton
              buttonProps={{
                disabled:
                  (hasAppliedForAtLeastOneEvent && !isPending) ||
                  isParticipatingAtLeastOneEvent,
              }}
              event={event}
            />
          </Space>
        </div>
      </div>
    </Card>
  )
}

import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Card, Space } from 'antd'

import { Recurrence, Status } from '../EventMeta'
import styles from './styles.module.less'
import { getUniqueParticipatingCompanies, matchStringToIcon } from './utils'

export interface EventCardBaseProps extends EventCardDefaultProps {
  canUpdateEventStatus: boolean
}

import { useState } from 'react'

import { LogoGroup } from '../LogoGroup'
import { EventCardDefaultProps } from '.'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'

export const EventCardDefault = ({
  canUpdateEventStatus,
  event,
  onClick,
}: EventCardBaseProps) => {
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
                disabled: !canUpdateEventStatus,
              }}
              event={event}
            />
          </Space>
        </div>
      </div>
    </Card>
  )
}

import { EyeOutlined } from '@ant-design/icons'
import { Avatar, Card, Space } from 'antd'

import { Recurrence, Time } from '../EventMeta'
import styles from './styles.module.less'
import { matchStringToIcon } from './utils'

export interface EventCardSmallProps extends EventCardDefaultProps {
  canUpdateEventStatus: boolean
}

import { useState } from 'react'

import { EventCardDefaultProps } from '.'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'

export const EventCardSmall = ({
  canUpdateEventStatus,
  event,
  onClick,
}: EventCardSmallProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isHovered) setIsHovered(false)
  }

  return (
    <Card
      className={styles['event-card-small']}
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
            size={105}
          />
        </div>
        <Space>
          <div className="summary">
            <div className="title">{event.title}</div>
            <div className="info">
              <div className="event-meta">
                <Space size="large">
                  <Recurrence event={event} />
                  <Time event={event} />
                </Space>
              </div>
            </div>
          </div>
          <div className="actions">
            <Space>
              <ToggleSubscribeButton
                buttonProps={{
                  disabled: !canUpdateEventStatus,
                }}
                event={event}
              />
            </Space>
          </div>
        </Space>
      </div>
    </Card>
  )
}

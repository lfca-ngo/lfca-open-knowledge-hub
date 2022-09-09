import { EyeOutlined, HourglassOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, message, Popover, Space } from 'antd'

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
  appliedEventsCount: number
}

import { useState } from 'react'

import { LogoGroup } from '../LogoGroup'
import { ToggleSubscribeButton } from './ToggleSubscribeButton'

export const EventCardDefault = ({
  appliedEventsCount,
  event,
  onClick,
}: EventCardDefaultProps) => {
  const [isHovered, setIsHovered] = useState(false)
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

  const handleMouseEnter = () => {
    if (!isHovered) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isHovered) setIsHovered(false)
  }

  return (
    <>
      <Card
        className="event-card default"
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
              {event.participationRequestStatus === 'PENDING' ? (
                <Popover content={'Your application is pending'}>
                  <Button
                    disabled
                    icon={<HourglassOutlined />}
                    loading={fetching}
                    onClick={handleJoin}
                    type="primary"
                  >
                    Pending
                  </Button>
                </Popover>
              ) : (
                <ToggleSubscribeButton
                  buttonProps={{ disabled: appliedEventsCount > 0 }}
                  event={event}
                />
              )}
            </Space>
          </div>
        </div>
      </Card>
    </>
  )
}

require('./styles.less')

import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { Space } from 'antd'
import moment from 'moment'
import { useMemo } from 'react'
import { RRule } from 'rrule'

import { EventFragment, EventStatus } from '../../services/lfca-backend'

export interface EventMetaProps {
  event: EventFragment
  compact?: boolean
}

export const EventMeta = ({ compact, event }: EventMetaProps) => {
  const statusString = useMemo(() => {
    switch (event.status) {
      case EventStatus.UPCOMING: {
        if (event.recurrence) {
          return `starts ${moment(event.start).format('LL')}`
        }
        return 'upcoming'
      }
      case EventStatus.RUNNING: {
        if (event.recurrence) {
          return `running since ${moment(event.start).format('MMM Do')}`
        }

        return 'running'
      }
      case EventStatus.EXPIRED:
      default:
        return 'expired'
    }
  }, [event.recurrence, event.start, event.status])

  return (
    <div className={`event-meta${compact ? ' compact' : ''}`}>
      {!compact && (
        <div className="block">
          <Space align="start">
            <SolutionOutlined />
            {`${event.participationRequestsPendingCount} application${
              event.participationRequestsPendingCount === 0 ||
              event.participationRequestsPendingCount > 1
                ? 's'
                : ''
            }`}
          </Space>

          <Space align="start">
            <CheckOutlined />
            {`${event.participationRequestsApprovedCount} participant${
              event.participationRequestsApprovedCount === 0 ||
              event.participationRequestsApprovedCount > 1
                ? 's'
                : ''
            }`}
          </Space>
        </div>
      )}

      <div className="block">
        <Space align="start">
          <CalendarOutlined />
          {event.recurrence
            ? RRule.fromString(event.recurrence).toText()
            : moment(event.start).format('LL')}
        </Space>

        <Space align="start">
          <ClockCircleOutlined />
          {event.isAllDay
            ? 'all day'
            : `${moment(event.start).format('LT')} - ${moment(event.end).format(
                'LT'
              )}`}
        </Space>
      </div>

      <div className="block">
        <Space align="start">
          <FieldTimeOutlined />
          {statusString}
        </Space>
      </div>
    </div>
  )
}

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

export const ParticipationRequestsApproved = ({ event }: EventMetaProps) => {
  return (
    <Space align="start">
      <CheckOutlined />
      {`${event.participantsUserRSVPAcceptedCount} participant${
        event.participantsUserRSVPAcceptedCount === 0 ||
        event.participantsUserRSVPAcceptedCount > 1
          ? 's'
          : ''
      }`}
    </Space>
  )
}

export const ParticipationRequestsPending = ({ event }: EventMetaProps) => {
  return (
    <Space align="start">
      <SolutionOutlined />
      {`${event.participantsAwaitingAdminApprovalCount} application${
        event.participantsAwaitingAdminApprovalCount === 0 ||
        event.participantsAwaitingAdminApprovalCount > 1
          ? 's'
          : ''
      }`}
    </Space>
  )
}

export const Recurrence = ({ event }: EventMetaProps) => {
  return (
    <Space align="start">
      <CalendarOutlined />
      {event.recurrenceRule
        ? RRule.fromString(event.recurrenceRule).toText()
        : moment(event.start).format('LL')}
    </Space>
  )
}

export const Time = ({ event }: EventMetaProps) => {
  return (
    <Space align="start">
      <ClockCircleOutlined />
      {`${moment(event.start).format('LT')} - ${moment(event.end).format(
        'LT'
      )}`}
    </Space>
  )
}

export const Status = ({ event }: EventMetaProps) => {
  const statusString = useMemo(() => {
    switch (event.status) {
      case EventStatus.UPCOMING: {
        if (event.recurrenceRule) {
          return `starts ${moment(event.start).format('LL')}`
        }
        return 'upcoming'
      }
      case EventStatus.RUNNING: {
        if (event.recurrenceRule) {
          return `running since ${moment(event.start).format('MMM Do')}`
        }

        return 'running'
      }
      case EventStatus.EXPIRED:
      default:
        return 'expired'
    }
  }, [event.recurrenceRule, event.start, event.status])

  return (
    <Space align="start">
      <FieldTimeOutlined />
      {statusString}
    </Space>
  )
}

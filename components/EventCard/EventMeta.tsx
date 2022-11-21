import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { Space } from 'antd'
import moment from 'moment-timezone'
import { useMemo } from 'react'
import { RRule } from 'rrule'

import { EventFragment, EventStatus } from '../../services/lfca-backend'

export interface EventMetaProps {
  event: EventFragment
  compact?: boolean
  minApprovedCount?: number
}

export const ParticipationRequestsApproved = ({
  event,
  minApprovedCount,
}: EventMetaProps) => {
  if (
    minApprovedCount &&
    event.participantsUserRSVPAcceptedCount < minApprovedCount
  )
    return null
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

export const ParticipationRequestsPending = ({
  event,
  minApprovedCount,
}: EventMetaProps) => {
  if (
    minApprovedCount &&
    event.participantsAwaitingAdminApprovalCount < minApprovedCount
  )
    return null

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
  const dateString = useMemo(() => {
    if (!event.nextOccurrenceEnd || !event.nextOccurrenceStart) return '-'

    return `${event.recurrenceRule ? 'next meeting on' : 'on'} ${moment(
      event.nextOccurrenceStart
    )
      .tz('Europe/Berlin')
      .format('lll')} - ${moment(event.nextOccurrenceEnd)
      .tz('Europe/Berlin')
      .format('LT z')}`
  }, [event.nextOccurrenceEnd, event.nextOccurrenceStart, event.recurrenceRule])

  return (
    <Space align="start">
      <ClockCircleOutlined />
      {dateString}
    </Space>
  )
}

export const Status = ({ event }: EventMetaProps) => {
  const statusString = useMemo(() => {
    switch (event.status) {
      case EventStatus.UPCOMING: {
        return 'upcoming'
      }
      case EventStatus.RUNNING: {
        return 'running'
      }
      case EventStatus.EXPIRED:
      default:
        return 'expired'
    }
  }, [event.status])

  return (
    <Space align="start">
      <FieldTimeOutlined />
      {statusString}
    </Space>
  )
}

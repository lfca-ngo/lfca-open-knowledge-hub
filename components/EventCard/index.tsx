require('./styles.less')

import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  HourglassOutlined,
  SolutionOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Button, Card, Divider, message, Space } from 'antd'
import moment from 'moment'
import { useMemo } from 'react'
import { RRule } from 'rrule'

import {
  EventFragment,
  useCreateEventParticipationRequestMutation,
} from '../../services/lfca-backend'

export interface EventCardProps {
  event: EventFragment
  small?: boolean
}

export const EventCard = ({ event, small }: EventCardProps) => {
  // TODO: CreateParticipationRequest
  const [{ fetching }, createEventParticipationRequest] =
    useCreateEventParticipationRequestMutation()

  const statusString = useMemo(() => {
    const nowDate = new Date()
    const dtStart = new Date(event.start)

    if (event.recurrence) {
      // Check if the recurrence has an event after and before the current date
      const options = RRule.parseString(event.recurrence)
      options.dtstart = dtStart
      const rule = new RRule(options)
      const [firstDate] = rule.all((date, i) => i === 0)
      const nextDate = rule.after(nowDate)
      if (!nextDate) return 'completed'
      const prevDate = rule.before(nowDate)
      if (!prevDate) return `starts ${moment(firstDate).format('LL')}`
      return `running since ${moment(firstDate).format('MMM Do')}`
    }

    if (nowDate < dtStart) {
      return 'coming up'
    }
    return 'completed'
  }, [event.start, event.recurrence])

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

  return (
    <Card className="event-card">
      <div className="header">
        <div className="title">{event.title}</div>

        {!small && (
          <div className="actions">
            <Button
              disabled={event.participationRequestStatus === 'PENDING'}
              icon={
                event.participationRequestStatus === 'PENDING' ? (
                  <HourglassOutlined />
                ) : (
                  <UserAddOutlined />
                )
              }
              loading={fetching}
              onClick={handleJoin}
              type="primary"
            >
              {event.participationRequestStatus === 'PENDING'
                ? 'Pending'
                : 'Join'}
            </Button>
          </div>
        )}
      </div>

      <Divider />

      <div className={`meta${small ? ' small' : ''}`}>
        {!small && (
          <div className="block">
            <Space align="start">
              <SolutionOutlined />
              {`${event.participationRequestsPendingCount} applications`}
            </Space>

            <Space align="start">
              <CheckOutlined />
              {`${event.participationRequestsApprovedCount} participants`}
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
              : `${moment(event.start).format('LT')} - ${moment(
                  event.end
                ).format('LT')}`}
          </Space>
        </div>

        <div className="block">
          <Space align="start">
            <FieldTimeOutlined />
            {statusString}
          </Space>
        </div>
      </div>
    </Card>
  )
}

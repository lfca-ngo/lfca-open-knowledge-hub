import {
  CalendarOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { Collapse } from 'antd'
import { Space } from 'antd'
import moment from 'moment-timezone'
import { useMemo } from 'react'

import { EventFragment, EventStatus } from '../../services/lfca-backend'
import { MarkdownContent } from '../MarkdownContent'

const { Panel } = Collapse

export interface EventMetaProps {
  event: EventFragment
}

export const Recurrence = ({ event }: EventMetaProps) => {
  return (
    <Space align="start">
      <CalendarOutlined />
      {event.recurrenceRuleReadable || moment(event.start).format('LL')}
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

export const EventMeta = ({ event }: EventMetaProps) => {
  if (!event) return null

  return (
    <Collapse accordion>
      <Panel header="Time & Date" key="time">
        {event && (
          <>
            <p>
              <Status event={event} />
            </p>
            <p>
              <Time event={event} />
            </p>
            <p>
              <Recurrence event={event} />
            </p>
          </>
        )}
      </Panel>
      <Panel header="Event Description" key="description">
        <MarkdownContent content={event?.description || ''} />
      </Panel>
    </Collapse>
  )
}

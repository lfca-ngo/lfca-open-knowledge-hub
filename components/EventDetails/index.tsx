import { Divider } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'
import { EventMeta } from '../EventMeta'

export interface EventCardDefaultProps {
  event?: EventFragment
}

export const EventDetails = ({ event }: EventCardDefaultProps) => {
  if (!event) return null

  return (
    <div>
      <h1>{event.title}</h1>
      <EventMeta event={event} />

      <Divider />
      <h4 style={{ margin: '10px 0 20px' }}>Add this event to your calendar</h4>
      <p>If this event is already in your calendar, it will be updated.</p>
      <EventCalendarLinks event={event} />

      <p style={{ margin: '20px 0 10px' }}>
        We are looking forward to seeing you in the event. Please add the invite
        to the calendar of your choice:
      </p>
    </div>
  )
}

import { Collapse, Divider } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { EventCalendarLinks } from '../EventCalendarLinks'
import { Recurrence, Status } from '../EventCard/EventMeta'
import styles from './styles.module.less'

const { Panel } = Collapse

export interface EventCardDefaultProps {
  event?: EventFragment
}

export const EventDetails = ({ event }: EventCardDefaultProps) => {
  if (!event) return null

  return (
    <div className={styles['event-card-large']}>
      <h1>{event.title}</h1>
      <Collapse accordion>
        <Panel header="Details" key="details">
          {event?.description}
        </Panel>
        <Panel header="Time" key="time">
          {event && (
            <>
              <Recurrence event={event} />
              <Status event={event} />
            </>
          )}
        </Panel>
      </Collapse>

      <Divider />
      <h4 style={{ margin: '10px 0 20px' }}>Add this event to your calendar</h4>
      <EventCalendarLinks event={event} />

      <p style={{ margin: '20px 0 10px' }}>
        We are looking forward to seeing you in the event. Please add the invite
        to the calendar of your choice:
      </p>
    </div>
  )
}

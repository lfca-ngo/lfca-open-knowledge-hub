import { Collapse } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { Recurrence, Status, Time } from '../EventCard/EventMeta'
import { MarkdownContent } from '../MarkdownContent'

const { Panel } = Collapse

export interface EventMetaProps {
  event?: EventFragment
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

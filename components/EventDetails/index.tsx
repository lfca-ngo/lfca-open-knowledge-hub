import { Avatar, Card, Collapse, Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'
import { Recurrence, Status } from '../EventCard/EventMeta'
import {
  getUniqueParticipatingCompanies,
  matchStringToIcon,
} from '../EventCard/utils'
import styles from './styles.module.less'

const { Panel } = Collapse

export interface EventCardDefaultProps {
  event?: EventFragment
  hideTitle?: boolean
}

import { LogoGroup } from '../LogoGroup'

export const EventDetails = ({
  event,
  hideTitle = false,
}: EventCardDefaultProps) => {
  return (
    <div className={styles['event-card-large']}>
      {!hideTitle && <div className="header">event.title</div>}

      <Collapse accordion>
        <Panel header="Details" key="details">
          Something
        </Panel>
        <Panel header="Time" key="time">
          Something
          {/* <Recurrence event={event} /> */}
          {/* <Status event={event} /> */}
        </Panel>
      </Collapse>
    </div>
  )
}

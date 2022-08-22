require('./styles.less')

import { List } from 'antd'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { EventCard } from '../EventCard'
import { EventCardSkeleton } from '../EventCard/EventCardSkeleton'

interface EventsListProps {
  events: EventFragment[]
  fetching: boolean
  small?: boolean
}

export const EventsList = ({ events, fetching, small }: EventsListProps) => {
  return (
    <div className="events-list">
      <List
        className="no-padding"
        dataSource={events}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          size: 'small',
        }}
        renderItem={(item) => {
          return (
            <List.Item className="list-item">
              <EventCardSkeleton fetching={true} small={small}>
                <EventCard event={item} small={small} />
              </EventCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

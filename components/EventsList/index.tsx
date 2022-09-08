require('./styles.less')

import { List } from 'antd'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { EventCard, EventCardProps } from '../EventCard'
import { EventCardSkeleton } from '../EventCard/EventCardSkeleton'

interface EventsListProps {
  events: EventFragment[]
  fetching: boolean
  type?: EventCardProps['type']
}

export const EventsList = ({ events, fetching, type }: EventsListProps) => {
  return (
    <div className="events-list">
      <List
        className="no-padding"
        dataSource={events}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 30,
          size: 'small',
        }}
        renderItem={(item) => {
          return (
            <List.Item
              className="list-item"
              key={!fetching ? item.id : undefined}
            >
              <EventCardSkeleton fetching={fetching} type={type}>
                <EventCard event={item} type={type} />
              </EventCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

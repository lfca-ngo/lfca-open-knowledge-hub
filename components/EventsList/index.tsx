require('./styles.less')

import { List } from 'antd'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { EventCard } from '../EventCard'
import { EventCardSkeleton } from '../EventCard/EventCardSkeleton'

interface EventsListProps {
  events: EventFragment[]
  fetching: boolean
  compact?: boolean
}

export const EventsList = ({ compact, events, fetching }: EventsListProps) => {
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
            <List.Item
              className="list-item"
              key={!fetching ? item.id : undefined}
            >
              <EventCardSkeleton compact={compact} fetching={fetching}>
                <EventCard compact={compact} event={item} />
              </EventCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

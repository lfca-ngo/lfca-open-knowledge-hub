require('./styles.less')

import { List } from 'antd'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { EventCard, EventCardProps } from '../EventCard'
import { EventCardSkeleton } from '../EventCard/EventCardSkeleton'

interface EventsListProps {
  appliedEvents: EventFragment[]
  events: EventFragment[]
  fetching: boolean
  participatingEvents: EventFragment[]
  type?: EventCardProps['type']
}

export const EventsList = ({
  appliedEvents,
  events,
  fetching,
  participatingEvents,
  type,
}: EventsListProps) => {
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
                <EventCard
                  appliedEventsCount={appliedEvents.length}
                  event={item}
                  participatingEventsCount={participatingEvents.length}
                  type={type}
                />
              </EventCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

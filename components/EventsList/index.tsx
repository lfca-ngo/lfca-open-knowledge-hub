require('./styles.less')

import { MessageOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, List, message } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { COMMUNITY_GROUPS } from '../../utils/routes'
import { EmptyState } from '../EmptyState'
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
  const { asPath, push } = useRouter()

  const handleJoin = () => {
    // if we are already on the community page, show a message
    if (asPath === COMMUNITY_GROUPS)
      message.info('Please select one of the groups from the list!')
    else push(COMMUNITY_GROUPS)
  }

  return (
    <div className="events-list">
      <ConfigProvider
        renderEmpty={() => (
          <EmptyState
            actions={[
              <Button
                block
                icon={<UserAddOutlined />}
                key="goto"
                onClick={handleJoin}
                type="primary"
              >
                Join a group
              </Button>,
            ]}
            alignment="left"
            icon={<MessageOutlined />}
            size="small"
            text="Join a mastermind group and meet monthly with peers to exchange learnings."
            title="No groups"
          />
        )}
      >
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
      </ConfigProvider>
    </div>
  )
}

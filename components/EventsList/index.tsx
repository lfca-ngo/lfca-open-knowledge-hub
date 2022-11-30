import { MessageOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, List, message } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { EventWithParticipantsFragment } from '../../services/lfca-backend'
import { COMMUNITY_GROUPS } from '../../utils/routes'
import { EmptyState } from '../EmptyState'
import { EventCard, EventCardProps } from '../EventCard'
import { EventCardSkeleton } from '../EventCard/EventCardSkeleton'
import styles from './styles.module.less'

interface EventsListProps {
  isAllowedToJoin: boolean
  customEmptyState?: React.ReactNode
  events: EventWithParticipantsFragment[]
  fetching: boolean
  type?: EventCardProps['type']
}

export const EventsList = ({
  customEmptyState,
  events,
  fetching,
  isAllowedToJoin,
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
    <div className={styles['events-list']}>
      <ConfigProvider
        renderEmpty={() =>
          customEmptyState || (
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
              text="Join a Mastermind Group and meet monthly with peers to exchange learnings."
              title="No groups"
            />
          )
        }
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
                    event={item}
                    isAllowedToJoin={isAllowedToJoin}
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

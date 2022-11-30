import { Alert, Button, List, Popover, Space, Tag } from 'antd'

import { ONBOARDING_STEPS, useAnalytics } from '../../../hooks/segment'
import {
  EventCategory,
  EventStatus,
  useEventsQuery,
} from '../../../services/lfca-backend'
import { withAuth } from '../../../utils-server-only'
import { EventCard } from '../../EventCard'
import { EventCardSkeleton } from '../../EventCard/EventCardSkeleton'
import { getEventsByParticipationStatus } from '../../EventsList/utils'
import { DefaultStepProps } from './..'
import styles from './styles.module.less'

const GroupsContent = ({ onNext, title }: DefaultStepProps) => {
  const analytics = useAnalytics()

  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        filter: {
          category: EventCategory.ONBOARDING_COURSE,
          includeCancelled: false,
          includeExpired: false,
          status: EventStatus.UPCOMING,
        },
      },
    },
  })

  const goNext = () => {
    // subscribed to course
    analytics.track(ONBOARDING_STEPS.COMPLETED_ONBOARDING_COURSE_STEP)

    onNext?.()
  }

  const eventsStatus = getEventsByParticipationStatus(data?.events)
  const appliedOrAttendsAtLeastOneEvent =
    eventsStatus.appliedEvents.length > 0 ||
    eventsStatus.participatingEvents.length > 0

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Let’s get together! 🥳`}</h1>
      <div className="description">
        Groups are at the heart of our community. Every member starts by joining
        our open onboarding sessions, which help:
        <ul style={{ margin: '15px 0 0' }}>
          <li>Get to know peers</li>
          <li>Learn how to make use of our tools and resources</li>
          <li>Get started on building a climate strategy</li>
        </ul>
      </div>

      <List
        className={styles['events-list']}
        dataSource={data?.events.sort((a, b) => a.start.localeCompare(b.start))}
        loading={fetching}
        renderItem={(item) => (
          <List.Item className="list-item" key={item.id}>
            <EventCardSkeleton fetching={false} type={'small'}>
              <EventCard
                event={item}
                isAllowedToJoin={eventsStatus.appliedEvents?.length < 1}
                participatingEventsCount={0}
                type={'small'}
              />
            </EventCardSkeleton>
          </List.Item>
        )}
      />

      <Space direction="vertical" size="large">
        {appliedOrAttendsAtLeastOneEvent && (
          <Alert
            description="You will receive a calendar invitation with all the details."
            message="Request sent"
            showIcon
            type="success"
          />
        )}
        <Space>
          <Popover
            content={
              !appliedOrAttendsAtLeastOneEvent
                ? 'Please select one of the onboarding sessions first'
                : null
            }
          >
            <Button
              disabled={!appliedOrAttendsAtLeastOneEvent}
              onClick={goNext}
              size="large"
              type="primary"
            >
              Continue
            </Button>
          </Popover>
        </Space>
      </Space>
    </div>
  )
}

export const Groups = withAuth(GroupsContent)

export const GroupsSide = () => {
  return null
}

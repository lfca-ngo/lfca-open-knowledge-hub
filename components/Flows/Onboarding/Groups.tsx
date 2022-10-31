import { Alert, Button, List, Popover, Space, Tag } from 'antd'

import { EventCategory, useEventsQuery } from '../../../services/lfca-backend'
import { withAuth } from '../../../utils/with-auth'
import { EventCard } from '../../EventCard'
import { EventCardSkeleton } from '../../EventCard/EventCardSkeleton'
import { getEventsByParticipationStatus } from '../../EventsList/utils'
import { DefaultStepProps } from './..'
import styles from './styles.module.less'

const GroupsContent = ({ onNext, onPrev }: DefaultStepProps) => {
  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        filter: {
          // @TODO: add filter for expired events
          category: EventCategory.ONBOARDING_COURSE,
          includeCancelled: false,
        },
      },
    },
  })

  const eventsStatus = getEventsByParticipationStatus(data?.events)
  const appliedOrAttendsAtLeastOneEvent =
    eventsStatus.appliedEvents.length > 0 ||
    eventsStatus.participatingEvents.length > 0

  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Let’s get together! 🥳`}</h1>
      <div className="description">
        Our group formats are the heartbeat of our community. Every new member
        starts with our <b>free onboarding sessions</b>. During the webinar you
        will:
        <ul style={{ margin: '15px 0 0' }}>
          <li>get to know peers from our community</li>
          <li>understand our tools, action pillars and group formats</li>
          <li>learn how to build a climate strategy</li>
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
                appliedEventsCount={0}
                event={item}
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
            description="You will receive an Email with your calendar invite and details as soon as your request got approved."
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
              onClick={onNext}
              size="large"
              type="primary"
            >
              Continue
            </Button>
          </Popover>

          <Button onClick={onPrev} size="large" type="link">
            Back
          </Button>
        </Space>
      </Space>
    </div>
  )
}

export const Groups = withAuth(GroupsContent)

export const GroupsSide = () => {
  return null
}

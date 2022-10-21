import { Button, List, Space, Tag } from 'antd'

import { EventFragment } from '../../../services/lfca-backend'
import { withAuth } from '../../../utils/with-auth'
import { EventCard } from '../../EventCard'
import { EventCardSkeleton } from '../../EventCard/EventCardSkeleton'
import { DefaultStepProps } from './..'

const GROUPS: EventFragment[] = []

const GroupsContent = ({ onNext, onPrev }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Let’s get together! 🥳`}</h1>
      <div className="description">
        {`Our group formats are the heartbeat of our community. Every new member starts with our free onboarding sessions. During the webinar you will:`}
        <ul style={{ margin: '15px 0 0' }}>
          <li>get to know peers from our community</li>
          <li>understand our tools, action pillars and group formats</li>
          <li>learn how to build a climate strategy</li>
        </ul>
      </div>

      <List
        dataSource={GROUPS}
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

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Join group
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>
    </div>
  )
}

export const Groups = withAuth(GroupsContent)

export const GroupsSide = () => {
  return null
}

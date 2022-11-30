import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  ExclamationOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import { Popover, Tag } from 'antd'

import {
  EventCategory,
  EventParticipantStatus,
  EventStatus,
} from '../services/lfca-backend'

export const readableEventStatus = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.RUNNING:
      return 'active'
    case EventStatus.EXPIRED:
      return 'expired'
    case EventStatus.CANCELLED:
      return 'cancelled'
    case EventStatus.UPCOMING:
      return 'upcoming'
    default:
      return 'unknown'
  }
}

export const readableEventParticipantStatus = (
  status: EventParticipantStatus
): string => {
  switch (status) {
    case EventParticipantStatus.AWAITING_ADMIN_APPROVAL:
      return 'awaiting aproval'
    case EventParticipantStatus.AWAITING_USER_RSVP:
      return 'awaiting RSVP'
    case EventParticipantStatus.USER_RSVP_ACCEPTED:
      return 'user accepted'
    case EventParticipantStatus.USER_RSVP_DECLINED:
      return 'user declined'
    default:
      return 'unknown'
  }
}

export const eventParticipantStatusIcon = (
  status: EventParticipantStatus
): React.ReactNode => {
  switch (status) {
    case EventParticipantStatus.AWAITING_ADMIN_APPROVAL:
      return <ExclamationOutlined />
    case EventParticipantStatus.AWAITING_USER_RSVP:
      return <QuestionOutlined />
    case EventParticipantStatus.USER_RSVP_ACCEPTED:
      return <CheckOutlined />
    case EventParticipantStatus.USER_RSVP_DECLINED:
      return <CloseOutlined />
    default:
      return 'unknown'
  }
}

export const eventCategoryMetaData = (category: EventCategory) => {
  switch (category) {
    case EventCategory.COMMUNITY_EVENTS:
      return {
        icon: <NotificationOutlined />,
        name: 'Events',
        sortValue: 200,
      }
    case EventCategory.MASTERMIND_GROUP:
      return {
        description: (
          <>
            <p>
              Our online Mastermind Groups connect sustainability practitioners
              across 10-15 companies from the same industry – it’s a
              peer-to-peer mentoring format that supports you in your work on
              sustainability projects. This is the space where you can ask
              questions, bounce ideas, share knowledge, and build
              collaborations.{' '}
            </p>

            <p>
              <b>How to join:</b> Choose the group that fits your business best.
              Once your application is approved, you’ll receive a recurring
              calendar invite. From then on, you’ll be part of a long-term,
              close-knit team – and your hour together each month will be an
              invaluable source of mutual support.
            </p>
          </>
        ),
        icon: null,
        maxSubscriptionsCount: 1,
        name: (
          <>
            Mastermind Groups{' '}
            <Popover
              content="During our BETA program, the master mind groups are available to all community members. From 03/23 they will be part of the BASIC+ tiers"
              overlayClassName="popover-lg"
            >
              <Tag
                color="blue"
                icon={<ExperimentOutlined style={{ margin: 0 }} />}
              >
                BETA
              </Tag>
            </Popover>
          </>
        ),
        sortValue: 300,
      }
    case EventCategory.ONBOARDING_COURSE:
      return {
        icon: <CommentOutlined />,
        maxSubscriptionsCount: 1,
        name: 'Onboarding Courses',
        sortValue: 100,
      }
    default:
      return {
        icon: <CalendarOutlined />,
        name: category,
        sortValue: 0,
      }
  }
}

import {
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
  QuestionOutlined,
} from '@ant-design/icons'

import { EventParticipantStatus, EventStatus } from '../services/lfca-backend'

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

import { CheckOutlined, SolutionOutlined } from '@ant-design/icons'
import { Space } from 'antd'

import { EventFragment } from '../../services/lfca-backend'

export interface ParticipationCountProps {
  event: EventFragment
  minCount?: number
}

export const ParticipationCountRSVPAccepted = ({
  event,
  minCount,
}: ParticipationCountProps) => {
  if (minCount && event.participantsUserRSVPAcceptedCount < minCount)
    return null
  return (
    <Space align="start">
      <CheckOutlined />
      {`${event.participantsUserRSVPAcceptedCount} participant${
        event.participantsUserRSVPAcceptedCount === 0 ||
        event.participantsUserRSVPAcceptedCount > 1
          ? 's'
          : ''
      }`}
    </Space>
  )
}

export const ParticipationCountAwaitingAdminApproval = ({
  event,
  minCount,
}: ParticipationCountProps) => {
  if (minCount && event.participantsAwaitingAdminApprovalCount < minCount)
    return null

  return (
    <Space align="start">
      <SolutionOutlined />
      {`${event.participantsAwaitingAdminApprovalCount} application${
        event.participantsAwaitingAdminApprovalCount === 0 ||
        event.participantsAwaitingAdminApprovalCount > 1
          ? 's'
          : ''
      }`}
    </Space>
  )
}

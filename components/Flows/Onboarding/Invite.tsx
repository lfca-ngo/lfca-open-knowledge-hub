import { Button, Space, Tag } from 'antd'

import { trackEvent } from '../../../services/analytics'
import { withAuth } from '../../../utils-server-only'
import { InviteTeam } from '../../InviteTeam'
import { DefaultStepProps } from './..'

const InviteContent = ({ onNext, onPrev, title }: DefaultStepProps) => {
  const goNext = () => {
    // completed form
    trackEvent({
      name: 'completedInvitationStep',
    })
    onNext?.()
  }

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>Get others on board! 💪🏽</h1>
      <div className="description">
        Taking climate action is a team sport. Assemble your crew by inviting
        your colleagues to our Members Area.
      </div>

      <InviteTeam />

      <Space style={{ marginTop: '20px' }}>
        <Button onClick={goNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>
    </div>
  )
}

export const Invite = withAuth(InviteContent)

export const InviteSide = () => {
  return null
}

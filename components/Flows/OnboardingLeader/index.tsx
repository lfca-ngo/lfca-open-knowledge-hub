import { Button, Checkbox, Drawer, Space, Tag } from 'antd'
import { useState } from 'react'

import { useUser } from '../../../hooks/user'
import { ContentfulQuestionnaireFields } from '../../../services/contentful'
import { useCompleteUserActionMutation } from '../../../services/lfca-backend'
import { PersonalCarbonCalculator } from '../../../tools/PersonalCarbonCalculator'
import { ShareImage } from '../../../tools/ShareImage'
import { InviteTeam } from '../../InviteTeam'
import { Pledge } from '../../Pledge'

interface StepProps {
  onNext: () => void
}

const Commit = ({ onNext }: StepProps) => {
  const { user } = useUser()

  return (
    <div>
      <Tag className="super-text">Pledge</Tag>
      <h1>{`Welcome ${user?.firstName || ''}, let's get you started!`}</h1>

      <p>
        {`We founded LFCA with the goal to accelerate the transition towards a
        sustainable economy. To make this happen, we need to leverage our
        influence on a personal, business and political level. Please start by
        signing our Green Pledge as a leader of your company.`}
      </p>
      <Pledge name={`${user?.firstName} ${user?.lastName}`} onFinish={onNext} />
    </div>
  )
}

const Invite = ({ onNext }: StepProps) => {
  const [hasMinimumInvited, setHasMinimumInvited] = useState(false)
  const [isLeaderOfficer, setIsLeaderOfficer] = useState(false)

  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Invite at least one team member as a Climate Officer`}</h1>
      <p>
        {`Calculating the carbon footprint of an entire company and doing
        reduction and goal setting workshops takes quite a bit of time. We
        therefore ask you to appoint at least one motivated team member that
        helps to coordinate these efforts.`}
      </p>
      <ul>
        <li>
          {`If you already have a person or team that takes care of
          sustainability, the choice is obvious`}
        </li>
        <li>
          {`If you don't, pick someone who is genuinely passionate about the
          topic. We recommend to invite that colleague with a personal message!`}
        </li>
      </ul>
      <InviteTeam onMinimumInvited={() => setHasMinimumInvited(true)} />
      <Space direction="vertical" size="large">
        <Checkbox
          checked={isLeaderOfficer}
          onChange={(e) => setIsLeaderOfficer(e.target.checked)}
        >
          {`I will take over the role of Climate Officer for my company
          (not-recommended)`}
        </Checkbox>
        <Button
          disabled={!isLeaderOfficer && !hasMinimumInvited}
          onClick={onNext}
          size="large"
          type="primary"
        >
          {`Continue`}
        </Button>
      </Space>
    </div>
  )
}

interface FootprintProps extends StepProps {
  questionnaire: ContentfulQuestionnaireFields
}

const Footprint = ({ onNext, questionnaire }: FootprintProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const [{ error, fetching }, completeUserAction] =
    useCompleteUserActionMutation()

  const saveAndContinue = (val: number) => {
    completeUserAction({
      input: {
        actionContentId: 'personalPledge',
        isCompleted: true,
        values: {
          result: val,
        },
      },
    }).then(({ error }) => {
      if (!error) {
        setDrawerVisible(false)
        onNext()
      }
    })
  }

  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Great! Change starts with yourself. Let's start by examining your personal footprint`}</h1>
      <p>
        {`To understand the issue of climate change, it's important to realize where we cause emissions in our day-to-day lifes and to learn how we can reduce our output of carbon.`}
      </p>
      <Button
        onClick={() => setDrawerVisible(true)}
        size="large"
        type="primary"
      >
        Calculate my footprint
      </Button>

      <Drawer
        className="fullscreen-drawer-bottom"
        height={'100%'}
        onClose={() => setDrawerVisible(false)}
        placement="bottom"
        visible={drawerVisible}
      >
        <PersonalCarbonCalculator
          error={error}
          loading={fetching}
          questionnaire={questionnaire}
          saveResult={saveAndContinue}
        />
      </Drawer>
    </div>
  )
}

const Share = () => {
  return (
    <div>
      <Tag className="super-text">Share</Tag>
      <h1>
        {`Great job, you are now part of our community! Share these news and help
        us spread the word`}
      </h1>
      <p>
        {`Did you know? LFCA has grown entirely by word of mouth. As a non-profit
        organization we rely on our community to increase our impact!`}
      </p>

      <ShareImage />
    </div>
  )
}

export const OnboardingLeaderSteps = [
  {
    component: Commit,
    description: 'Commit to action',
    title: 'Pledge',
  },
  {
    component: Invite,
    description: 'Get your team on board',
    title: 'Invite',
  },
  {
    component: Footprint,
    description: 'Understand your emissions',
    title: 'Footprint',
  },
  {
    component: Share,
    description: 'Use your influence',
    title: 'Share the news',
  },
]

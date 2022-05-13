import { Button, Checkbox, Drawer, Space, Tag } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { PersonalCarbonCalculator } from '../../../tools/PersonalCarbonCalculator'
import { InviteTeam } from '../../InviteTeam'
import { Pledge } from '../../Pledge'

const Commit = (props: any) => {
  return (
    <div>
      <Tag className="super-text">Pledge</Tag>
      <h1>{`Welcome Timo, let's get you started!`}</h1>
      <p>
        {`We started LFCA with the goal to accelerate the transition towards a
        sustainable economy. To make this happen, we need to leverage our
        influence on a personal, business and political level. Please start by
        signing our Green Pledge as a leader of LFCA.`}
      </p>
      <Pledge onFinish={() => props.setStep(1)} />
    </div>
  )
}

const Invite = (props: any) => {
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
          sustainabality, the choice is obvious`}
        </li>
        <li>
          {`If you don't, pick someone who is genuinely passionate about the
          topicWe recommend to invite that colleague with a personal message`}
        </li>
      </ul>
      <InviteTeam onMinimumInvited={() => setHasMinimumInvited(true)} />
      <Space direction="vertical">
        <Checkbox
          checked={isLeaderOfficer}
          onChange={(e) => setIsLeaderOfficer(e.target.checked)}
        >
          {`I will take over the role of Climate Officer for my company
          (not-recommended)`}
        </Checkbox>
        <Button
          disabled={!isLeaderOfficer && !hasMinimumInvited}
          onClick={() => props.setStep(2)}
          size="large"
          type="primary"
        >
          {`Continue`}
        </Button>
      </Space>
    </div>
  )
}

const Footprint = (props: any) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const saveAndContinue = () => {
    // @TODO: save to database
    // show loading spinner
    setDrawerVisible(false)
    props.setStep(3)
  }

  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Welcome Timo, let's get you started!`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      <Button
        onClick={() => setDrawerVisible(true)}
        size="large"
        type="primary"
      >
        Start
      </Button>

      <Drawer
        className="fullscreen-drawer-bottom"
        height={'100%'}
        onClose={() => setDrawerVisible(false)}
        placement="bottom"
        visible={drawerVisible}
      >
        <PersonalCarbonCalculator
          questionnaire={props.questionnaire}
          saveResult={saveAndContinue}
        />
      </Drawer>
    </div>
  )
}

const Share = () => {
  const router = useRouter()
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

      <div style={{ background: 'black', height: '100px' }}>
        SHARING FEATURE
      </div>

      <Button onClick={() => router.push('/')} size="large" type="primary">
        Show Dashboard
      </Button>
    </div>
  )
}

export const OnboardingLeaderSteps = (props: any) => [
  {
    component: <Commit {...props} />,
    description: 'Commit to action',
    title: 'Pledge',
  },
  {
    component: <Invite {...props} />,
    description: 'Get to know the platform',
    title: 'Invite',
  },
  {
    component: <Footprint {...props} />,
    description: 'Understand your emissions',
    title: 'Footprint',
  },
  {
    component: <Share {...props} />,
    description: 'Use your influence',
    title: 'Share the news',
  },
]

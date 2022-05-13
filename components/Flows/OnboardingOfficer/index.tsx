import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Drawer, Tag } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Communicate from '../../../public/img/communicate.jpg'
import Explore from '../../../public/img/explore.jpg'
import Mastermind from '../../../public/img/mastermind.jpg'
import { ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { InfoCarousel } from '../../InfoCarousel'

const ELEMENTS = [
  {
    description:
      'See who else is working on your actions and get in touch using our Slack channel (check your emails for the invite link)',
    icon: <ArrowRightOutlined />,
    image: Communicate,
    title: 'Collaborate and co-create knowledge',
  },
  {
    description:
      'We are with you all the way: From kickstarting your carbon accounting, over reduction measures towards participation in meaningful campaigns.',
    icon: <ArrowRightOutlined />,
    image: Explore,
    title: 'Measure, plan, reduce & contribute',
  },
  {
    description:
      'Once you implemented all required actions from your program, you will be rewarded with a custom microsite for your company.',
    icon: <ArrowRightOutlined />,
    image: Mastermind,
    title: 'Share your progress with the world',
  },
]

const Intro = (props: any) => {
  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Welcome Timo, let's get you started!`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      <InfoCarousel elements={ELEMENTS} />
      <Button onClick={() => props.setStep(1)} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}

const Personalize = (props: any) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const onSelect = (e: any) => {
    e.preventDefault()
    setDrawerVisible(true)
  }

  return (
    <div>
      <Tag className="super-text">Personalize</Tag>
      <h1>
        Great! Now, please select all actions that you have already taken at
        LFCA
      </h1>
      <ActionsList actionsByTags={props.byTags} onSelect={onSelect} />
      <Drawer onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
        <CompleteActionForm />
      </Drawer>
    </div>
  )
}

const Start = () => {
  const router = useRouter()
  return (
    <div>
      <Tag className="super-text">{`Let's go!`}</Tag>
      <h1>{`You are all set! Find the next steps on your personal dashboard`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      <Button
        icon={<ArrowRightOutlined />}
        onClick={() => router.push('/')}
        size="large"
        type="primary"
      >
        Continue
      </Button>
    </div>
  )
}

export const OnboardingOfficerSteps = (props: any) => [
  {
    component: <Intro {...props} />,
    description: 'Get to know the platform',
    title: 'Intro',
  },
  {
    component: <Personalize {...props} />,
    description: 'What’s your status quo',
    title: 'Personalize',
  },
  {
    component: <Start {...props} />,
    description: 'Get started',
    title: 'Let’s go!',
  },
]

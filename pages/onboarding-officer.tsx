import { Tabs } from 'antd'
import type { NextPage } from 'next'

import { useState } from 'react'
import { StepsLayout } from '../components/Layout'
import { InfoCarousel } from '../components/InfoCarousel'
import { ArrowRightOutlined } from '@ant-design/icons'
import Explore from '../public/img/explore.jpg'
import Communicate from '../public/img/communicate.jpg'
import Mastermind from '../public/img/mastermind.jpg'

const { TabPane } = Tabs


const ELEMENTS = [
  {
    title: "Measure, plan, reduce & contribute",
    description:
      "We are with you all the way: From kickstarting your carbon accounting, over reduction measures towards participation in meaningful campaigns.",
    icon: <ArrowRightOutlined />,
    image: Explore,
  },
  {
    title: "Collaborate and co-create knowledge",
    description:
      "See who else is working on your actions and get in touch using our Slack channel (check your emails for the invite link)",
    icon: <ArrowRightOutlined />,
    image: Communicate,
  },
  {
    title: "Share your progress with the world",
    description:
      "Once you implemented all required actions from your program, you will be rewarded with a custom microsite for your company.",
    icon: <ArrowRightOutlined />,
    image: Mastermind,
  },
]


const OnboardingOfficer: NextPage = (props: any) => {
  const [currentStep, setStep] = useState(0)

  // Steps
  const STEPS = [{
    title: 'Something', description: 'Another', component: <div>
      <h1>Hallo</h1>
      <InfoCarousel elements={ELEMENTS} />
      <button onClick={() => setStep(1)}>Continue</button>
    </div>
  }, { title: 'Something', description: 'Another' }, { title: 'Something', description: 'Another' }]

  const currentView = STEPS[currentStep].component
  return (
    <StepsLayout currentStep={currentStep} setStep={setStep} steps={STEPS}>
      {currentView}
    </StepsLayout>
  )
}


export default OnboardingOfficer

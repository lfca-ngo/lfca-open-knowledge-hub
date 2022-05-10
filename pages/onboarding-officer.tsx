import type { GetStaticProps, NextPage } from 'next'

import { useState } from 'react'
import { StepsLayout } from '../components/Layout'
import { InfoCarousel } from '../components/InfoCarousel'
import { ActionsList } from '../components/ActionsList'
import { ArrowRightOutlined } from '@ant-design/icons'
import { fetchAllActions } from '../services/contentful'
import Explore from '../public/img/explore.jpg'
import Communicate from '../public/img/communicate.jpg'
import Mastermind from '../public/img/mastermind.jpg'



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
  const { byTags } = props.actions
  const [currentStep, setStep] = useState(0)
  console.log('b', byTags)
  // Steps
  const STEPS = [{
    title: 'Intro', description: 'Get to know the platform', component: <div>
      <div>Intro</div>
      <h1>Welcome Timo, let's get you started!</h1>
      <p>The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.</p>
      <InfoCarousel elements={ELEMENTS} />
      <button onClick={() => setStep(1)}>Continue</button>
    </div>
  }, {
    title: 'Personalize', description: 'What’s your status quo', component: <div>
      <div>Personalize</div>
      <h1>Great! Now, please select all actions that you have already taken at LFCA</h1>
      <ActionsList actionsByTags={byTags} />
    </div>
  }, {
    title: 'Let’s go!', description: 'Get started', component: <div>
      <h1>Let's go</h1>
    </div>
  }]

  const currentView = STEPS[currentStep].component
  return (
    <StepsLayout canClose onClose={() => console.log('do something')} currentStep={currentStep} setStep={setStep} steps={STEPS}>
      {currentView}
    </StepsLayout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions,
    },
  }
}


export default OnboardingOfficer

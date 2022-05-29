import { Button, Drawer, Tag } from 'antd'
import { useState } from 'react'

import { useUser } from '../../../hooks/user'
import { PersonalCarbonCalculator } from '../../../tools/PersonalCarbonCalculator'
import { ShareImage } from '../../../tools/ShareImage'
import Link from 'next/link'
import { ACTIONS } from '../../../utils/routes'

interface StepProps {
  onNext: () => void
}

const Intro = ({ onNext }: StepProps) => {
  const { user } = useUser()

  return (
    <div>
      <Tag className="super-text">Pledge</Tag>
      <h1>{`Hi ${user?.firstName}, time to renew your pledge!`}</h1>
      <p>
        {`We started LFCA with the goal to accelerate the transition towards a
        sustainable economy. To make this happen, we need to leverage our
        influence on a personal, business and political level. Please start by
        signing our Green Pledge as a leader of your company.`}
      </p>
      <Button onClick={onNext} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}

interface FootprintProps extends StepProps {
  questionnaire: any
}

const Footprint = ({ onNext, questionnaire }: FootprintProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const saveAndContinue = () => {
    // @TODO: save to database
    // show loading spinner
    setDrawerVisible(false)
    onNext()
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
          questionnaire={questionnaire}
          saveResult={saveAndContinue}
        />
      </Drawer>
    </div>
  )
}

const Compare = ({ onNext }: StepProps) => {
  return (
    <div>
      <Tag className="super-text">Compare</Tag>
      <h1>{`Let's see how you compare to last year`}</h1>
      <p>{`...`}</p>
      <Button onClick={onNext} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}

const Share = ({ onNext }: StepProps) => {
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

      <Link href={ACTIONS}>
        <Button
          onClick={onNext}
          size="large"
          style={{ marginTop: '30px' }}
          type="primary"
        >
          To my dashboard
        </Button>
      </Link>
    </div>
  )
}

export const RenewalLeaderSteps = [
  {
    component: Intro,
    description: 'Intro',
    title: 'Renewal',
  },
  {
    component: Footprint,
    description: 'Understand your emissions',
    title: 'Footprint',
  },
  {
    component: Compare,
    description: 'Compare to last year',
    title: 'Compare',
  },
  {
    component: Share,
    description: 'Use your influence',
    title: 'Share the news',
  },
]

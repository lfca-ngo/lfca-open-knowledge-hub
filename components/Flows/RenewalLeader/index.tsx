import { Button, Drawer, Tag } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

import { useUser } from '../../../hooks/user'
import { ContentfulQuestionnaireFields } from '../../../services/contentful'
import { useCompleteUserActionMutation } from '../../../services/lfca-backend'
import { PersonalCarbonCalculator } from '../../../tools/PersonalCarbonCalculator'
import { ShareImage } from '../../../tools/ShareImage'
import { ACTIONS } from '../../../utils/routes'
import { UserActionsList } from '../../UserActionsList'

interface StepProps {
  onNext: () => void
}

interface FootprintProps extends StepProps {
  questionnaire: ContentfulQuestionnaireFields
}

const Footprint = ({ onNext, questionnaire }: FootprintProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { user } = useUser()

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
      <h1>{`Hi ${user?.firstName}! It's time to renew your personal pledge`}</h1>

      <p>
        Authentic climate leadership starts with acting responsibly in your
        private life. But keep in mind that your biggest impact potential lies
        within your company and your personal sphere of influence.
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
        open={drawerVisible}
        placement="bottom"
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

const Compare = ({ onNext }: StepProps) => {
  return (
    <div>
      <Tag className="super-text">Compare</Tag>
      <h1>{`Awesome! Now let's have a look at how you compare to last year`}</h1>
      <p>
        Below you can see a list with all of your carbon measurements since you
        joined the community. Again, strive to minimize your footprint but keep
        the focus on the biggest lever: Your company and your personal sphere of
        influence!
      </p>
      <UserActionsList />
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
        {`Okay, now it's time to do what really matters: Share these news and help
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

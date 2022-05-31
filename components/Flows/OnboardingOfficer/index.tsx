import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Drawer, message, Tag } from 'antd'
import { useState } from 'react'

import Communicate from '../../../public/img/communicate.jpg'
import Explore from '../../../public/img/explore.jpg'
import Mastermind from '../../../public/img/mastermind.jpg'
import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
} from '../../../services/lfca-backend'
import { actionHasReviews } from '../../../utils'
import { ActionListProps, ActionsList } from '../../ActionsList'
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

interface StepProps {
  onNext: () => void
}

const Intro = ({ onNext }: StepProps) => {
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
      <Button onClick={onNext} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}

interface PersonalizeProps extends StepProps {
  actionsByTags: ActionListProps['actionsByTags']
  fetching?: boolean
}

const Personalize = ({ actionsByTags, fetching, onNext }: PersonalizeProps) => {
  const [activeAction, setActiveAction] =
    useState<CompanyActionListItemFragment>()
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

  const [, completeCompanyAction] = useCompleteCompanyActionMutation()

  const handleUnselect = (action: CompanyActionListItemFragment) => {
    completeCompanyAction({
      input: {
        actionContentId: action.contentId,
        isCompleted: false,
        skipRequirementsCheck: true,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Marked action as incomplete')
    })
  }

  const handleContinue = () => {
    onNext()
  }

  return (
    <div>
      <Tag className="super-text">Personalize</Tag>
      <h1>Great! Now, please select all actions that you have already taken</h1>
      <p style={{ margin: '20px 0 30px' }}>
        {`Let's start with a simple exercise: Did you already take climate action
        in your company? Which actions have you taken and what have you learned?
        If you are uncertain, skip an action. You can read more detailed
        descriptions of all actions and mark them later on.`}
      </p>
      <ActionsList
        actionListItemProps={{
          ctaText: 'Select',
          onCtaClick: (action) => {
            setActiveAction(action)
            setSelectedActionContentId(action.contentId)
          },
          onUnselect: handleUnselect,
          showInfoBox: true,
          unselectText: 'Unselect',
        }}
        actionsByTags={actionsByTags}
        fetching={fetching}
      />
      <Button onClick={handleContinue} size="large" type="primary">
        Continue
      </Button>
      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setSelectedActionContentId(null)}
        visible={!!selectedActionContentId}
      >
        {selectedActionContentId ? (
          <CompleteActionForm
            actionContentId={selectedActionContentId}
            onComplete={() => setSelectedActionContentId(null)}
            withReviewForm={actionHasReviews(activeAction)}
          />
        ) : null}
      </Drawer>
    </div>
  )
}

const Start = ({ onNext }: StepProps) => {
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
        onClick={onNext}
        size="large"
        type="primary"
      >
        Continue
      </Button>
    </div>
  )
}

export const OnboardingOfficerSteps = [
  {
    component: Intro,
    description: 'Get to know the platform',
    title: 'Intro',
  },
  {
    component: Personalize,
    description: 'What’s your status quo',
    title: 'Personalize',
  },
  {
    component: Start,
    description: 'Get started',
    title: 'Let’s go!',
  },
]

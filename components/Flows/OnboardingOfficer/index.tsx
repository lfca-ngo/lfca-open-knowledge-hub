import { ArrowRightOutlined, SlackOutlined } from '@ant-design/icons'
import { CaretRightOutlined } from '@ant-design/icons'
import { Button, Drawer, Modal, Space, Tag } from 'antd'
import { useState } from 'react'

import { useUser } from '../../../hooks/user'
import Communicate from '../../../public/img/communicate.jpg'
import Explore from '../../../public/img/explore.jpg'
import Mastermind from '../../../public/img/mastermind.jpg'
import { CompanyActionListItemFragment } from '../../../services/lfca-backend'
import {
  actionHasReviews,
  PRODUCT_VIDEO_URL,
  SLACK_INVITE_URL,
} from '../../../utils'
import { ActionListProps, ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { InfoCarousel } from '../../InfoCarousel'
import { VideoWrapper } from '../../VideoWrapper'

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
  const [visible, setVisible] = useState(false)
  const { user } = useUser()

  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Welcome ${user?.firstName || ''}, let's get you started!`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      <InfoCarousel elements={ELEMENTS} />
      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>

        <Button
          ghost
          icon={<CaretRightOutlined />}
          onClick={() => setVisible(true)}
          size="large"
        >
          Product Video
        </Button>
      </Space>

      <Modal
        destroyOnClose
        onCancel={() => setVisible(false)}
        visible={visible}
        wrapClassName="modal-md"
      >
        <VideoWrapper
          sources={[{ src: PRODUCT_VIDEO_URL, type: 'video/mp4' }]}
        />
      </Modal>
    </div>
  )
}

interface PersonalizeProps extends StepProps {
  actionsByCategories: ActionListProps['actionsByCategories']
  fetching?: boolean
}

const Personalize = ({
  actionsByCategories,
  fetching,
  onNext,
}: PersonalizeProps) => {
  const [activeAction, setActiveAction] =
    useState<CompanyActionListItemFragment>()
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

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
        If you are uncertain about an action, just skip it. You can read more
        detailed descriptions of all of them and mark them later on. If
        something sounds interesting, mark it as planned!`}
      </p>
      <ActionsList
        actionListItemProps={{
          onCtaClick: (action) => {
            setActiveAction(action)
            setSelectedActionContentId(action.contentId)
          },
          selectText: 'Select',
          showInfoBox: true,
          unselectText: 'Unselect',
        }}
        actionsByCategories={actionsByCategories}
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

const Slack = ({ onNext }: StepProps) => {
  return (
    <div>
      <Tag className="super-text">{`Slack`}</Tag>
      <h1>{`Did you already join our Slack community?`}</h1>
      <p>
        Share experiences with other Climate Officers from our community. Access
        sub-industry channels where you can connect with members from your
        sector that are facing similar challenges (e.g. food, finance,
        mobility).
      </p>
      <Space>
        <a href={SLACK_INVITE_URL} rel="noreferrer" target="_blank">
          <Button icon={<SlackOutlined />} size="large" type="primary">
            Accept your Slack invite
          </Button>
        </a>

        <Button onClick={onNext} size="large">
          Already done, skip
        </Button>
      </Space>
    </div>
  )
}

const Start = ({ onNext }: StepProps) => {
  return (
    <div>
      <Tag className="super-text">{`Let's go!`}</Tag>
      <h1>{`You are all set! Find the next steps on your personal dashboard`}</h1>
      <p>
        The required, recommended and planned actions will be highlighted on
        your dashboard. If an action expires, it will pop up there as well. We
        hope you will find inspiration from our actions modules and community
        content. Please reach out to us if you need any assitance!
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
    component: Slack,
    description: 'Slack',
    title: 'Connect to Slack',
  },
  {
    component: Start,
    description: 'Get started',
    title: 'Let’s go!',
  },
]

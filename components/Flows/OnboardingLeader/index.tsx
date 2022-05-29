require('./styles.less')

import {
  CopyOutlined,
  LinkedinOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Checkbox,
  Drawer,
  Input,
  message,
  Space,
  Tag,
} from 'antd'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { LinkedinShareButton } from 'react-share'

import { useUser } from '../../../hooks/user'
import { useCreateInvite } from '../../../services/next-server'
import { PersonalCarbonCalculator } from '../../../tools/PersonalCarbonCalculator'
import { copyTextToClipboard } from '../../../utils'
import { InviteTeam } from '../../InviteTeam'
import { Pledge } from '../../Pledge'

const BTN_WIDTH = '60'

interface StepProps {
  onNext: () => void
}

const Commit = ({ onNext }: StepProps) => {
  const { user } = useUser()

  return (
    <div>
      <Tag className="super-text">Pledge</Tag>
      <h1>{`Welcome ${user?.firstName}, let's get you started!`}</h1>

      <p>
        {`We started LFCA with the goal to accelerate the transition towards a
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

const Share = ({ onNext }: StepProps) => {
  const executedRef = useRef(false)
  const { user } = useUser()

  const [{ data, error, fetching }, createInvite] = useCreateInvite()

  useEffect(() => {
    if (user?.picture && !executedRef.current) {
      // make sure we only execute this once
      createInvite({
        sender: user?.firstName,
        senderImage: user?.picture,
        socialDescription:
          'Tackling the climate crisis requires bold action & collaboration. Can we count on you?',
        socialTitle: 'Join our Community',
        uid: user?.id,
      })
      executedRef.current = true
    }
  }, [user, createInvite])

  const handleCopy = () => {
    copyTextToClipboard('mylink', (note: string, hasCopied: boolean) => {
      if (hasCopied) {
        message.success(note)
      } else message.error(note)
    })
  }

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

      {error && <Alert message={error} type="error" />}

      <div className="sharing-preview">
        {data?.ogImageUrl && !fetching ? (
          <Image
            alt="share-image"
            layout="fill"
            objectFit="contain"
            src={data?.ogImageUrl}
          />
        ) : (
          <div className="loading-wrapper">
            <LoadingOutlined />
          </div>
        )}
      </div>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Input.Group compact>
          <Input
            disabled
            size="large"
            style={{ width: `calc(100% - ${BTN_WIDTH}px` }}
            value={data?.shortLink}
          />
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            size="large"
            style={{ width: `${BTN_WIDTH}px` }}
          />
        </Input.Group>
        {data?.shortLink && (
          <LinkedinShareButton
            summary="..."
            title="Join our Community"
            url={data?.shortLink}
          >
            <Button
              block
              icon={<LinkedinOutlined />}
              onClick={onNext}
              size="large"
              type="primary"
            >
              Share on LinkedIn
            </Button>
          </LinkedinShareButton>
        )}
      </Space>
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
    description: 'Get to know the platform',
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

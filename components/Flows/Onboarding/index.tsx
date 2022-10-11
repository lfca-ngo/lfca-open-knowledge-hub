import { Button, Space, Tag } from 'antd'

interface StepProps {
  onNext: () => void
}

const Intro = ({ onNext }: StepProps) => {
  return (
    <div>
      <Tag className="super-text">Intro</Tag>
      <h1>{`Welcome!`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      {/* <InfoCarousel elements={ELEMENTS} /> */}
      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
      </Space>
    </div>
  )
}

export const OnboardingSteps = [
  {
    component: Intro,
    description: 'Get to know the platform',
    title: 'Intro',
  },
  {
    component: Intro,
    description: 'Second step',
    title: 'Something',
  },
]

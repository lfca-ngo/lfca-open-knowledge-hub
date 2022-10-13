import { Button, List, Space, Tag } from 'antd'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import subscriptionsData from '../../../next-fetch-during-build/data/_subscriptions-data.json'
import { withAuth } from '../../../utils/with-auth'
import { DefaultStepProps, StepPropsWithSharedState } from './..'

const DEFAULT_SUBSCRIPTION_TYPE = 'PREMIUM'

export const MembershipContent = ({
  onNext,
  setSharedState,
  sharedState,
}: StepPropsWithSharedState) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Last step - choose your plan 👍`}</h1>
      <div className="description">
        {`Last but not least: Choose your membership tier. If you can afford to support us with a premium subscription, you will enable us to bring lfca to others for free.`}
      </div>

      <button onClick={() => setSharedState?.({ subscription: 'PREMIUM' })}>
        x
      </button>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
      </Space>
    </div>
  )
}

export const Membership = withAuth(MembershipContent)

export const MembershipSide = ({ sharedState }: StepPropsWithSharedState) => {
  console.log('side', sharedState)

  const plan = subscriptionsData[0]

  const allFeatures = subscriptionsData
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  return (
    <div>
      <List
        dataSource={allFeatures.map((i) => {
          if (
            plan.features.findIndex((f) => f.contentId === i.contentId) > -1
          ) {
            return i
          } else return { ...i, disabled: true }
        })}
        renderItem={(item) => <List.Item>{item.title}</List.Item>}
      />
    </div>
  )
}

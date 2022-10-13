import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import { Button, Card, Divider, List, Space, Tag } from 'antd'

import subscriptionsData from '../../../next-fetch-during-build/data/_subscriptions-data.json'
import { withAuth } from '../../../utils/with-auth'
import { ListSelect, OptionKey } from '../../ListSelect'
import { StepPropsWithSharedState } from './..'

import styles from './styles.module.less'

export const MembershipContent = ({
  onNext,
  setSharedState,
  sharedState,
}: StepPropsWithSharedState) => {
  const onSubscriptionChange = (value: OptionKey[]) => {
    const [subscription] = value

    setSharedState?.({
      selectedSubscriptionType: subscription,
    })
  }

  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Last step - choose your plan 👍`}</h1>
      <div className="description">
        {`Last but not least: Choose your membership tier. If you can afford to support us with a premium subscription, you will enable us to bring lfca to others for free.`}
      </div>

      <ListSelect
        mode="single"
        onChange={onSubscriptionChange}
        options={subscriptionsData.map((s) => ({
          key: s.name,
          label: s.name,
        }))}
        value={sharedState?.selectedSubscriptionType}
      />

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
  const plan = subscriptionsData.find(
    (s) => s.name === sharedState?.selectedSubscriptionType
  )

  const allFeatures = subscriptionsData
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  return (
    <div className={styles['membership-summary']}>
      <h4>Summary</h4>
      <Card>
        <div className="summary-title">{plan?.name}</div>
        <List
          dataSource={allFeatures.map((i) => {
            const isIncluded = plan?.features?.some(
              (f) => f.contentId === i.contentId
            )
            return { ...i, disabled: isIncluded }
          })}
          renderItem={(item) => {
            return (
              <List.Item>
                <div className="icon-wrapper">
                  {item?.disabled ? (
                    <CloseCircleFilled className="wine" />
                  ) : (
                    <CheckCircleFilled className="green" />
                  )}
                </div>
                {item?.title}
              </List.Item>
            )
          }}
        />
        <Divider />
      </Card>
    </div>
  )
}

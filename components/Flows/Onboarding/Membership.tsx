import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Popover,
  Row,
  Space,
  Tag,
} from 'antd'

import { useUser } from '../../../hooks/user'
import subscriptionsData from '../../../next-fetch-during-build/data/_subscriptions-data.json'
import { withAuth } from '../../../utils/with-auth'
import { ListSelect, OptionKey } from '../../ListSelect'
import { calculatePricePoint } from '../../SubscriptionSelector/utils'
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
          description: s.shortDescription,
          icon: <Avatar shape="square" src={s.icon.url} />,
          key: s.name,
          label: s.name,
          recommended: s.name === 'PREMIUM',
        }))}
        value={sharedState?.selectedSubscriptionType}
      />

      <Space style={{ marginTop: '20px' }}>
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

  const { company } = useUser()
  const calculatedPrice = calculatePricePoint(plan, company?.employeeCount)

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
                    <CheckCircleFilled className="green" />
                  ) : (
                    <CloseCircleFilled className="wine" />
                  )}
                </div>
                {item?.title}

                <Popover
                  content={documentToReactComponents(
                    item?.description as Document
                  )}
                  overlayClassName="popover-lg"
                  title={item?.title}
                >
                  <InfoCircleOutlined />
                </Popover>
              </List.Item>
            )
          }}
        />
        <Divider />
        <Row className="price-summary">
          <Col className="price-hints" xs={12}>
            <div>Total</div>
            <small>per month, paid yearly</small>
          </Col>
          <Col className="price" xs={12}>
            <div>
              {calculatedPrice?.price ? `${calculatedPrice?.price} €` : '0 €'}
            </div>
            <small>add. VAT</small>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

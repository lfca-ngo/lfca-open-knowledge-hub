import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  InputNumber,
  List,
  message,
  Popover,
  Row,
  Space,
  Tag,
} from 'antd'
import classNames from 'classnames'
import _debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'

import { useUser } from '../../../hooks/user'
import subscriptionsData from '../../../next-fetch-during-build/data/_subscriptions-data.json'
import { ContentfulContentCollectionFields } from '../../../services/contentful'
import { useUpdateCompanyMutation } from '../../../services/lfca-backend'
import { withAuth } from '../../../utils/with-auth'
import { ContentList } from '../../ContentList'
import { Section } from '../../Layout'
import { ListSelect, OptionKey } from '../../ListSelect'
import { calculatePricePoint } from '../../SubscriptionSelector/utils'
import { StepPropsWithSharedState } from './..'
import styles from './styles.module.less'

export const MembershipContent = ({
  membershipFaq,
  onNext,
  onPrev,
  setSharedState,
  sharedState,
  title,
}: StepPropsWithSharedState & {
  membershipFaq?: ContentfulContentCollectionFields
}) => {
  const [showFaq, setShowFaq] = useState(false)
  const onSubscriptionChange = (value: OptionKey[]) => {
    const [subscription] = value

    setSharedState?.({
      selectedSubscriptionType: subscription,
    })
  }

  const isFreeTierSelected = sharedState?.selectedSubscriptionType === 'FREE'

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Last but not least - choose the membership that suits you 🙌`}</h1>
      <div className="description">
        <p>
          {`We believe the solutions to the defining crisis of our times should
          not be hidden behind paywalls. But achieving that goal is a collective
          effort: We need those who can afford it, to support those who can't.`}
        </p>
        <p>
          By joining us as a <b>SUPPORTER</b>, you help us achieve this mission.
          Need some help with your decision?{' '}
          <a onClick={() => setShowFaq(true)}>We got you covered</a>
        </p>
      </div>

      <Form layout="vertical">
        <Form.Item label="Please select your membership">
          <ListSelect
            mode="single"
            onChange={onSubscriptionChange}
            options={subscriptionsData.map((s) => ({
              description: s.shortDescription,
              icon: <Avatar shape="square" src={s.icon.url} />,
              key: s.name,
              label: s.name,
            }))}
            value={sharedState?.selectedSubscriptionType}
          />
        </Form.Item>
      </Form>

      {isFreeTierSelected ? (
        <Alert
          description="You can continue on a basic or premium tier and pay at any point in the next 30 days. During this time you can downgrade your tier without any extra costs."
          message="Tip: Try Basic or Premium for free"
          showIcon
          type="warning"
        />
      ) : (
        <Alert
          description="We will send you an invoice with a payment link shortly after your onboarding is done. You can downgrade your subscription at any time."
          message="What's next?"
          showIcon
          type="info"
        />
      )}

      <Space style={{ marginTop: '20px' }}>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>

      <Drawer
        className="drawer-md"
        onClose={() => setShowFaq(false)}
        open={showFaq}
        placement="left"
      >
        <Section bordered={false} title="Membership" titleSize="default">
          <div style={{ margin: '20px 0 0' }}>
            <ContentList content={membershipFaq} type="accordion" />
          </div>
        </Section>
      </Drawer>
    </div>
  )
}

export const Membership = withAuth(MembershipContent)

export const MembershipSide = ({ sharedState }: StepPropsWithSharedState) => {
  const [{ fetching }, updateCompany] = useUpdateCompanyMutation()
  const [teamSize, setTeamSize] = useState<number | null>()

  const plan = subscriptionsData.find(
    (s) => s.name === sharedState?.selectedSubscriptionType
  )

  const allFeatures = subscriptionsData
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const { company } = useUser()
  const calculatedPrice =
    plan?.pricing && calculatePricePoint(plan?.pricing, company?.employeeCount)

  const debouncedTeamSizeInput = useRef(
    _debounce(async (value) => {
      updateCompany({
        input: {
          employeeCount: value,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        message.success('Changed company size')
      })
    }, 500)
  ).current

  const handleTeamSizeChange = (val: number | null) => {
    debouncedTeamSizeInput(val)
  }

  useEffect(() => {
    if (company?.employeeCount) {
      setTeamSize(company?.employeeCount)
    }
  }, [company?.employeeCount])

  return (
    <div className={styles['membership-summary']}>
      <h4>Summary</h4>
      <Card>
        <Row align="middle">
          <Col xs={12}>
            <div className="summary-title">{plan?.name}</div>
          </Col>
          <Col className="team-input" xs={12}>
            <span className="team-input-label">
              {fetching && <LoadingOutlined />} Team
            </span>
            <InputNumber
              onChange={handleTeamSizeChange}
              size="small"
              value={teamSize}
            />
          </Col>
        </Row>

        <List
          dataSource={allFeatures.map((i) => {
            const isIncluded = plan?.features?.some(
              (f) => f.contentId === i.contentId
            )
            return { ...i, disabled: !isIncluded }
          })}
          renderItem={(item) => {
            return (
              <List.Item
                className={classNames('benefits-list-item', {
                  disabled: item?.disabled,
                })}
              >
                <div className="icon-wrapper">
                  {!item?.disabled ? (
                    <CheckCircleFilled className="green-medium" />
                  ) : (
                    <CloseCircleFilled className="red" />
                  )}
                </div>
                {item?.title}

                <Popover
                  content={documentToReactComponents(
                    item?.description as Document
                  )}
                  overlayClassName="popover-lg"
                  placement="left"
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

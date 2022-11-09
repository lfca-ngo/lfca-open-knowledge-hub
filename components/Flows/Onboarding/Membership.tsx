import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
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
  List,
  message,
  Popover,
  Row,
  Space,
  Tag,
} from 'antd'
import classNames from 'classnames'
import { useState } from 'react'

import { useUser } from '../../../hooks/user'
import subscriptionsData from '../../../next-fetch-during-build/data/_subscriptions-data.json'
import { trackEvent } from '../../../services/analytics'
import { ContentfulContentCollectionFields } from '../../../services/contentful'
import {
  CompanySubscriptionType,
  useUpdateCompanyMutation,
} from '../../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { ContentList } from '../../ContentList'
import { Section } from '../../Layout'
import { ListSelect, OptionKey } from '../../ListSelect'
import { SizeInput } from '../../SubscriptionSelector/SizeInput'
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
  const [{ fetching }, updateCompany] = useUpdateCompanyMutation()

  const [showFaq, setShowFaq] = useState(false)
  const onSubscriptionChange = (value: OptionKey[]) => {
    const [subscription] = value

    setSharedState?.({
      selectedSubscriptionType: subscription,
    })
  }

  const handleContinue = () => {
    // save subscription type
    updateCompany({
      input: {
        subscriptionType: sharedState?.selectedSubscriptionType,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        // completed form
        trackEvent({
          name: 'completedMembershipStep',
          values: {
            membership: sharedState?.selectedSubscriptionType,
          },
        })
        // go next
        message.success('Updated membership')
        onNext?.()
      }
    })
  }

  const isFreeTierSelected =
    sharedState?.selectedSubscriptionType === CompanySubscriptionType.FREE

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>Choose your membership type 🙌</h1>
      <div className="description">
        <p>
          {`We believe access to actionable knowledge shouldn't cost the Earth.
          Climate solutions should be open, collaborative and public.`}
        </p>
        <ul>
          <li>
            By becoming a basic or premium supporter, you directly contribute to
            making climate solutions available to the public
          </li>
          <li>
            Can’t currently afford the annual fee?{' '}
            <a href={DEFAULT_SUPPORT_EMAIL} rel="noreferrer" target="_blank">
              Get in touch
            </a>{' '}
            with our team
          </li>
          <li>
            Anything else on your mind? Check these{' '}
            <a onClick={() => setShowFaq(true)}>frequently asked questions</a>
          </li>
        </ul>
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
              label:
                s.name === CompanySubscriptionType.FREE
                  ? s.name
                  : `${s.name} Supporter`,
            }))}
            value={sharedState?.selectedSubscriptionType}
          />
        </Form.Item>
      </Form>

      {isFreeTierSelected ? (
        <Alert
          description="You can continue on the Basic or Premium tier and pay at any point in the next 30 days. If you don't, you will be automatically downgraded."
          message="Tip: Try a paid membership for free"
          showIcon
          type="warning"
        />
      ) : (
        <Alert
          description={
            <>
              <p>
                We will get in touch by email with additional information about
                your membership.
              </p>
              <p style={{ margin: '0' }}>
                The first 30 days are considered a trial phase to help you get
                to know our community and finalise the purchasing process. Your
                official membership only starts at the invoice date.
              </p>
            </>
          }
          message="What's next?"
          showIcon
          type="info"
        />
      )}

      <Space style={{ marginTop: '20px' }}>
        <Button
          loading={fetching}
          onClick={handleContinue}
          size="large"
          type="primary"
        >
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
  const { company, isVentureCapitalCompany } = useUser()

  const plan = subscriptionsData.find(
    (s) => s.name === sharedState?.selectedSubscriptionType
  )

  const allFeatures = subscriptionsData
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const calculatedPrice = calculatePricePoint(
    isVentureCapitalCompany ? 'maxFundsize' : 'maxFundsize',
    isVentureCapitalCompany ? plan?.pricingVentureCapital : plan?.pricing,
    isVentureCapitalCompany ? company?.fundSize : company?.employeeCount
  )

  return (
    <div className={styles['membership-summary']}>
      <h4>Summary</h4>
      <Card>
        <Row align="middle">
          <Col xs={8}>
            <div className="summary-title">{plan?.name}</div>
          </Col>
          <Col className="team-input" xs={16}>
            <SizeInput
              optionalInputNumberProps={{ size: 'small' }}
              style={{ justifyContent: 'flex-end' }}
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

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
import {
  CompanySubscriptionType,
  useUpdateCompanyMutation,
} from '../../../services/lfca-backend'
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
      <h1>{`Choose the membership that suits you best 🙌`}</h1>
      <div className="description">
        <p>
          {`We believe the solutions to the defining crisis of our times should
          not be hidden behind paywalls. But achieving that goal is a collective
          effort: We need those who can afford it, to support those who can't.`}
        </p>
        <p>
          By joining us as a Premium Supporter, you help us achieve this
          mission! Need some help with your decision?{' '}
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
          description="You can continue on a Basic or Premium tier and pay at any point in the next 30 days. If you don't, you will be automatically downgraded."
          message="Tip: Try Basic or Premium for free"
          showIcon
          type="warning"
        />
      ) : (
        <Alert
          description="We will get back to you with a written offer and a summary presentation via Email. Most members have additional questions and/or need to check in with their finance departments before continuing. We understand that. By continuing, you do not yet enter into any legal agreement with us. After a trial phase of 30 days you will be automatically downgraded to the FREE tier."
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
  const [{ fetching }, updateCompany] = useUpdateCompanyMutation()
  const [fundSize, setFundSize] = useState<number | null>()
  const [teamSize, setTeamSize] = useState<number | null>()
  const { company, isVentureCapitalCompany } = useUser()

  const plan = subscriptionsData.find(
    (s) => s.name === sharedState?.selectedSubscriptionType
  )

  const allFeatures = subscriptionsData
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const calculatedPrice = isVentureCapitalCompany
    ? calculatePricePoint(plan?.pricingVentureCapital, company?.fundSize, true)
    : calculatePricePoint(plan?.pricing, company?.employeeCount)

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

  const debouncedFundSizeInput = useRef(
    _debounce(async (value) => {
      updateCompany({
        input: {
          fundSize: value,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        message.success('Changed fund size')
      })
    }, 500)
  ).current

  const handleTeamSizeChange = (val: number | null) => {
    debouncedTeamSizeInput(val)
  }

  const handleFundSizeChange = (val: number | null) => {
    debouncedFundSizeInput(val)
  }

  // update employee count
  useEffect(() => {
    if (company?.employeeCount) {
      setTeamSize(company?.employeeCount)
    }
  }, [company?.employeeCount])

  // update fund count
  useEffect(() => {
    if (company?.fundSize) {
      setFundSize(company?.fundSize)
    }
  }, [company?.fundSize])

  return (
    <div className={styles['membership-summary']}>
      <h4>Summary</h4>
      <Card>
        <Row align="middle">
          <Col xs={8}>
            <div className="summary-title">{plan?.name}</div>
          </Col>
          <Col className="team-input" xs={16}>
            {isVentureCapitalCompany ? (
              <>
                <span className="team-input-label">
                  {fetching && <LoadingOutlined />} Fundsize
                </span>
                <InputNumber
                  onChange={handleFundSizeChange}
                  size="small"
                  value={fundSize}
                />
              </>
            ) : (
              <>
                <span className="team-input-label">
                  {fetching && <LoadingOutlined />} Team
                </span>
                <InputNumber
                  onChange={handleTeamSizeChange}
                  size="small"
                  value={teamSize}
                />
              </>
            )}
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

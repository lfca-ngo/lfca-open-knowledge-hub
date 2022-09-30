import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  InputNumber,
  List,
  Menu,
  Popover,
  Tabs,
} from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Subscription } from '../../services/contentful'
import styles from './styles.module.less'

const { TabPane } = Tabs

import { CheckOutlined, EllipsisOutlined, LockFilled } from '@ant-design/icons'
import classNames from 'classnames'

import { useUser } from '../../hooks/user'
import {
  CompanySubscriptionType,
  useCompanyQuery,
} from '../../services/lfca-backend'
import { getMailToLink } from '../../utils'
import { VideoWrapper } from '../VideoWrapper'

const DEFAULT_PLAN = 'BASIC'

const getUpgradeEmailBody = ({
  companyName,
  plan,
  size,
  userName,
}: {
  companyName: string
  plan: string
  size: string
  userName: string
}) => `Hello lfca.earth Team! 
We would love to upgrade our membership to ${plan}. Our team size as of today is ${size}. Could you please provide us with a payment link?

Thanks,
${userName}
${companyName}`

export const SubscriptionSelector = ({
  subscriptions = [],
}: {
  subscriptions?: Subscription[]
}) => {
  const [activeTab, setActiveTab] = useState(subscriptions[0].name)
  const [{ data: companyData }] = useCompanyQuery()

  const { company, subscriptionType, user } = useUser()

  const currentPlan = subscriptions.find(
    (s) => s.name === (subscriptionType || 'FREE')
  )

  const [employeeCount, setEmployeeCount] = useState(
    companyData?.company.employeeCount
  )

  // sync state with company size
  useEffect(() => {
    setEmployeeCount(companyData?.company.employeeCount)
  }, [companyData])

  // sync state with company subscription type
  useEffect(() => {
    setActiveTab(companyData?.company.subscriptionType || DEFAULT_PLAN)
  }, [companyData])

  // we show a list with all available features and
  // highlight the ones that are active in each package
  const allFeatures = subscriptions
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const handleUpgrade = ({ key }: { key: string }) => {
    const userName = `${user?.firstName} ${user?.lastName}`

    const mailToLink = getMailToLink({
      body: getUpgradeEmailBody({
        companyName: company?.name || `[YOUR_COMPANY_NAME]`,
        plan: key,
        size: `${employeeCount}` || `[YOUR_COMPANY_SIZE]`,
        userName: userName,
      }),
      subject: 'Upgrade membership',
      to: 'membership@lfca.earth',
    })
    window.location.href = mailToLink
  }

  const menu = () => {
    const menuItems = subscriptions
      .filter((s) => s.name !== CompanySubscriptionType.FREE)
      .map((s) => ({
        icon: currentPlan?.name === s.name ? <CheckOutlined /> : undefined,
        key: s.name,
        label: s.name,
      }))
    return <Menu items={menuItems} onClick={handleUpgrade} />
  }

  return (
    <div className="benefits-list">
      {/* Currently selected plan */}
      <div className="current-plan">
        <div className="current-plan-details">
          <div className="plan-icon">
            <Avatar shape="square" size={65} src={currentPlan?.icon.url} />
          </div>
          <div className="plan-content">
            <div className="title">{currentPlan?.name}</div>
            <div className="description">
              {currentPlan?.description &&
                documentToReactComponents(currentPlan?.description)}
            </div>
          </div>
        </div>
        <div className="plan-actions">
          <Form layout="inline">
            <Form.Item label="Team size">
              <InputNumber
                onChange={(val) => setEmployeeCount(val ?? undefined)}
                placeholder="10"
                size="large"
                value={employeeCount}
              />
            </Form.Item>
            <Dropdown overlay={menu}>
              <Button icon={<EllipsisOutlined />} size="large" type="primary">
                Upgrade
              </Button>
            </Dropdown>
          </Form>
        </div>
      </div>
      {/* Full list of benefits */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        tabPosition="left"
      >
        {subscriptions.map((plan) => {
          const calculatedPricePoint = plan.pricing.find(
            (price) => (price.maxEmployees || Infinity) >= (employeeCount || 0)
          )

          return (
            <TabPane
              key={plan.name}
              tab={
                <div className="plan-details">
                  <div className="title">{plan.name}</div>
                  <div className="cost">
                    {calculatedPricePoint?.price}€
                    <span className="suffix">/month</span>
                  </div>
                </div>
              }
            >
              <List
                dataSource={allFeatures.map((i) => {
                  if (
                    plan.features.findIndex(
                      (f) => f.contentId === i.contentId
                    ) > -1
                  ) {
                    return i
                  } else return { ...i, disabled: true }
                })}
                renderItem={(item) => (
                  <Popover
                    content={
                      item.video?.url ? (
                        <VideoWrapper
                          autoPlay={true}
                          muted={true}
                          sources={[
                            {
                              src: item.video?.url,
                              type: 'video/mp4',
                            },
                          ]}
                        />
                      ) : (
                        item.picture?.url && (
                          <Image
                            alt={item.title}
                            height={400}
                            layout="responsive"
                            objectFit="cover"
                            src={item.picture?.url}
                            width={400}
                          />
                        )
                      )
                    }
                    destroyTooltipOnHide
                    overlayClassName="popover-xl title-big"
                    placement="bottom"
                    title={
                      <div className="tooltip-title">
                        <div className="text">
                          {item?.disabled && <LockFilled />} {item?.title}
                        </div>
                        <div className="extra">
                          {item?.disabled && (
                            <Button
                              onClick={() =>
                                handleUpgrade({ key: DEFAULT_PLAN })
                              }
                              size="small"
                              type="primary"
                            >
                              Unlock
                            </Button>
                          )}
                        </div>
                      </div>
                    }
                  >
                    <List.Item
                      className={classNames({ disabled: item.disabled })}
                    >
                      {item?.picture?.url && (
                        <div className="image-wrapper">
                          <Image
                            alt="Community"
                            layout="fill"
                            objectFit="cover"
                            src={item?.picture?.url}
                          />
                        </div>
                      )}
                      <div className="content">
                        <h4>
                          {item?.disabled && <LockFilled />} {item?.title}
                        </h4>
                        <div className="description">
                          {documentToReactComponents(item?.description)}
                        </div>
                      </div>
                    </List.Item>
                  </Popover>
                )}
              />
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

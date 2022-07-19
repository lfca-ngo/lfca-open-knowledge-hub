require('./styles.less')

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
import { useEffect, useMemo, useState } from 'react'

import { Subscription } from '../../services/contentful'

const { TabPane } = Tabs

import { CheckOutlined, EllipsisOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import { useUser } from '../../hooks/user'
import { useCompanyQuery } from '../../services/lfca-backend'
import { getMailToLink, PRODUCT_VIDEO_URL } from '../../utils'
import { VideoWrapper } from '../VideoWrapper'

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
We would love to upgrade our subscription to ${plan}. Our team size as of today is ${size}. Could you please provide us with a payment link?

Thanks,
${userName}
${companyName}`

export const SubscriptionSelector = ({
  subscriptions = [],
}: {
  subscriptions?: Subscription[]
}) => {
  // TODO replace with actual attribute from the backend
  const [{ data: companyData }] = useCompanyQuery()

  const { company, subscriptionType, user } = useUser()
  const currentPlan = subscriptions.find(
    (s) => s.name === (subscriptionType || 'Free')
  )

  const [employeeCount, setEmployeeCount] = useState(
    companyData?.company.employeeCount
  )

  // update initial state with company size
  useEffect(() => {
    setEmployeeCount(companyData?.company.employeeCount)
  }, [companyData])

  // we show a list with all available features and
  // highlight the ones that are active in each package
  const allFeatures = subscriptions
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const menu = useMemo(() => {
    const handleUpgrade = ({ key }: { key: string }) => {
      const userName = `${user?.firstName} ${user?.lastName}`

      const mailToLink = getMailToLink({
        body: getUpgradeEmailBody({
          companyName: company?.name || `[YOUR_COMPANY_NAME]`,
          plan: key,
          size: `${employeeCount}` || `[YOUR_COMPANY_SIZE]`,
          userName: userName,
        }),
        subject: 'Change subscription',
        to: 'info@lfca.earth',
      })
      window.location.href = mailToLink
    }

    const menuItems = subscriptions.map((s) => ({
      icon: currentPlan?.name === s.name ? <CheckOutlined /> : undefined,
      key: s.name,
      label: s.name,
    }))
    return <Menu items={menuItems} onClick={handleUpgrade} />
  }, [currentPlan, subscriptions, employeeCount, company, user])

  return (
    <div className="benefits-list">
      {/* Currently selected plan */}
      <div className="current-plan">
        <div className="plan-icon">
          <Avatar shape="square" src={currentPlan?.icon.url} />
        </div>
        <div className="plan-content">
          <div className="title">{currentPlan?.name}</div>
          <div className="description">
            {currentPlan?.description &&
              documentToReactComponents(currentPlan?.description)}
          </div>
        </div>
        <div className="plan-actions">
          <Form layout="inline">
            <Form.Item label="Team size">
              <InputNumber
                onChange={(val) => setEmployeeCount(val)}
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
      <Tabs tabPosition="left">
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
                      <VideoWrapper
                        autoPlay={true}
                        muted={true}
                        sources={[
                          { src: PRODUCT_VIDEO_URL, type: 'video/mp4' },
                        ]}
                      />
                    }
                    destroyTooltipOnHide
                    overlayClassName="popover-lg title-big"
                    placement="bottom"
                    title="Title"
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
                        <h4>{item?.title}</h4>
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

require('./styles.less')

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Avatar, Button, InputNumber, List, Popover, Space, Tabs } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  ContentfulContentCollectionFields,
  Subscription,
} from '../../services/contentful'

const { TabPane } = Tabs

import {
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'

import { useUser } from '../../hooks/user'
import { useCompanyQuery } from '../../services/lfca-backend'
import { PRODUCT_VIDEO_URL } from '../../utils'
import { VideoWrapper } from '../VideoWrapper'

export const SubscriptionSelector = ({
  subscriptions = [],
}: {
  subscriptions?: Subscription[]
}) => {
  // TODO replace with actual attribute from the backend
  const [{ data: companyData, fetching }] = useCompanyQuery()

  const { subscriptionType } = useUser()
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

  const allFeatures = subscriptions
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })
  console.log(allFeatures)
  return (
    <div className="benefits-list">
      {/* Currently selected plan */}
      <div className="current-plan">
        <div className="plan-icon">
          <Avatar src={currentPlan?.icon.url} />
        </div>
        <div className="plan-content">
          <div className="title">{currentPlan?.name}</div>
          <div className="description">
            {currentPlan?.description &&
              documentToReactComponents(currentPlan?.description)}
          </div>
        </div>
        <div className="plan-actions">
          <Space>
            <InputNumber
              onChange={(val) => setEmployeeCount(val)}
              placeholder="10"
              size="large"
              value={employeeCount}
            />
            <Button size="large" type="primary">
              Upgrade
            </Button>
          </Space>
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

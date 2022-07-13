require('./styles.less')

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Avatar, Button, List, Tabs, InputNumber, Space, Popover } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ContentfulContentCollectionFields } from '../../services/contentful'

const { TabPane } = Tabs

import {
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'

import { useUser } from '../../hooks/user'
import { useCompanyQuery } from '../../services/lfca-backend'
import { VideoWrapper } from '../VideoWrapper'
import { PRODUCT_VIDEO_URL } from '../../utils'

// TODO: Remove once moved to the backend
export const Plans = [
  {
    basePrice: 0,
    help: 'You have only limited access to our app & community',
    icon: (
      <Avatar
        className="green-inverse"
        icon={<HeartOutlined />}
        shape="square"
        size={60}
      />
    ),
    planId: 'FREE',
    title: 'FREE',
  },
  {
    basePrice: 4.2,
    help: 'You can access most features, but are not highlighted on our website',
    icon: (
      <Avatar
        className="wine"
        icon={<GlobalOutlined />}
        shape="square"
        size={60}
      />
    ),
    planId: 'BASIC',
    title: 'BASIC',
  },
  {
    basePrice: 8.4,
    help: 'You can access all features and are highlighted on our website',
    icon: (
      <Avatar
        className="blue"
        icon={<RocketOutlined />}
        shape="square"
        size={60}
      />
    ),
    planId: 'PREMIUM',
    title: 'PREMIUM',
  },
]

export const BenefitsList = ({
  content = [],
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  // TODO replace with actual attribute from the backend
  const [{ data: companyData, fetching }] = useCompanyQuery()

  const { isPaying } = useUser()
  const currentPlan = isPaying
    ? Plans.find((p) => p.planId === 'BASIC')
    : Plans.find((p) => p.planId === 'FREE')

  const [employeeCount, setEmployeeCount] = useState(
    companyData?.company.employeeCount
  )

  // update initial state with company size
  useEffect(() => {
    setEmployeeCount(companyData?.company.employeeCount)
  }, [companyData])

  const benefitsCollection = content.find((c) => c.collectionId === 'benefits')
  const items = benefitsCollection?.content || []

  return (
    <div className="benefits-list">
      {/* Currently selected plan */}
      <div className="current-plan">
        <div className="plan-icon">{currentPlan?.icon}</div>
        <div className="plan-content">
          <div className="title">{currentPlan?.title}</div>
          <div className="description">{currentPlan?.help}</div>
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
        {Plans.map((plan) => {
          return (
            <TabPane
              key={plan.planId}
              tab={
                <div className="plan-details">
                  <div className="title">{plan.title}</div>
                  <div className="cost">
                    {((employeeCount || 0) * plan.basePrice).toFixed(0)}€
                    <span className="suffix">/month</span>
                  </div>
                </div>
              }
            >
              <List
                dataSource={items.map((i) => {
                  if ((i.availableIn || []).indexOf(plan.planId) > -1) {
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
                      className={classNames({ disabled: item?.disabled })}
                    >
                      {item?.preview?.url && (
                        <div className="image-wrapper">
                          <Image
                            alt="Community"
                            layout="fill"
                            objectFit="cover"
                            src={item?.preview?.url}
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

require('./styles.less')

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Avatar, Button, List, Tabs } from 'antd'
import Image from 'next/image'

import { ContentfulContentCollectionFields } from '../../services/contentful'

const { TabPane } = Tabs

import {
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'

import { useUser } from '../../hooks/user'

// TODO: Remove once moved to the backend
export const Plans = [
  {
    help: 'You have only limited access to our app & community',
    icon: (
      <Avatar
        className="green-inverse"
        icon={<HeartOutlined />}
        shape="square"
        size="large"
      />
    ),
    planId: 'FREE',
    title: 'FREE',
  },
  {
    help: 'You can access most features, but are not highlighted on our website',
    icon: (
      <Avatar
        className="wine"
        icon={<GlobalOutlined />}
        shape="square"
        size="large"
      />
    ),
    planId: 'BASIC',
    title: 'BASIC',
  },
  {
    help: 'You can access all features and are highlighted on our website',
    icon: (
      <Avatar
        className="blue"
        icon={<RocketOutlined />}
        shape="square"
        size="large"
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
  const { isPaying } = useUser()
  const currentPlan = isPaying
    ? Plans.find((p) => p.planId === 'BASIC')
    : Plans.find((p) => p.planId === 'FREE')

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
          <Button size="large" type="primary">
            Upgrade
          </Button>
        </div>
      </div>
      {/* Full list of benefits */}
      <Tabs tabPosition="left">
        {Plans.map((plan) => {
          return (
            <TabPane key={plan.planId} tab={plan.title}>
              <List
                dataSource={items.map((i) => {
                  if ((i.availableIn || []).indexOf(plan.planId) > -1) {
                    return i
                  } else return { ...i, disabled: true }
                })}
                renderItem={(item) => (
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
                )}
              />
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

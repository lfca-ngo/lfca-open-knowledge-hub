import { CheckOutlined, EllipsisOutlined, LockFilled } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  InputNumber,
  List,
  Menu,
  Tabs,
} from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/user'
import subscriptionsData from '../../next-fetch-during-build/data/_subscriptions-data.json'
import {
  CompanySubscriptionType,
  useCompanyQuery,
} from '../../services/lfca-backend'
import { getMailToLink } from '../../utils'
import styles from './styles.module.less'
import { calculatePricePoint, getUpgradeEmailBody } from './utils'

const DEFAULT_PLAN = 'BASIC'

export const SubscriptionSelector = () => {
  const subscriptions = subscriptionsData
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
    <div className={styles['benefits-list']}>
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
                documentToReactComponents(currentPlan?.description as Document)}
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
        items={subscriptions.map((plan) => {
          const calculatedPricePoint =
            plan.pricing && calculatePricePoint(plan.pricing, employeeCount)
          return {
            children: (
              <List
                dataSource={allFeatures}
                renderItem={(item) => {
                  const isDisabled =
                    plan.features.findIndex(
                      (f) => f.contentId === item.contentId
                    ) > -1
                  return (
                    <List.Item className={classNames({ disabled: isDisabled })}>
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
                          {isDisabled && <LockFilled />} {item?.title}
                        </h4>
                        <div className="description">
                          {documentToReactComponents(
                            item?.description as Document
                          )}
                        </div>
                      </div>
                    </List.Item>
                  )
                }}
              />
            ),
            key: plan.name,
            label: (
              <div className="plan-details">
                <div className="title">{plan.name}</div>
                <div className="cost">
                  {calculatedPricePoint?.price}€
                  <span className="suffix">/month</span>
                </div>
              </div>
            ),
          }
        })}
        onChange={(key) => setActiveTab(key)}
        tabPosition="left"
      />
    </div>
  )
}

import { CheckOutlined, EllipsisOutlined, LockFilled } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import {
  Avatar,
  Button,
  Dropdown,
  List,
  Menu,
  message,
  Space,
  Tabs,
} from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/user'
import subscriptionsData from '../../public/data/_subscriptions-data.json'
import {
  CompanySubscriptionType,
  useCompanyQuery,
  useUpdateCompanyMutation,
} from '../../services/lfca-backend'
import { SizeInput } from './SizeInput'
import styles from './styles.module.less'
import { calculatePricePoint } from './utils'

const DEFAULT_PLAN = 'BASIC'

export const SubscriptionSelector = () => {
  const subscriptions = subscriptionsData
  const [activeTab, setActiveTab] = useState(subscriptions[0].name)
  const [{ data: companyData }] = useCompanyQuery()

  const [{ fetching: updatingCompany }, updateCompany] =
    useUpdateCompanyMutation()

  const { company, isVentureCapitalCompany, subscriptionType } = useUser()

  const currentPlan = subscriptions.find(
    (s) => s.name === (subscriptionType || 'FREE')
  )

  useEffect(() => {
    setActiveTab(companyData?.company.subscriptionType || DEFAULT_PLAN)
  }, [companyData])

  const allFeatures = subscriptions
    .flatMap((s) => s.features)
    .filter((value, index, self) => {
      return self.findIndex((v) => v.contentId === value.contentId) === index
    })

  const handleUpgrade = ({ key }: { key: string }) => {
    updateCompany({
      input: {
        subscriptionType: key as CompanySubscriptionType,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else
        message.success(
          'We will get back to you regarding your membership via Mail.'
        )
    })
  }

  const menu = () => {
    const menuItems = subscriptions.map((s) => ({
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
          <Space>
            <SizeInput optionalInputNumberProps={{ size: 'large' }} />
            <Dropdown overlay={menu}>
              <Button
                icon={<EllipsisOutlined />}
                loading={updatingCompany}
                size="large"
                type="primary"
              >
                Upgrade
              </Button>
            </Dropdown>
          </Space>
        </div>
      </div>
      {/* Full list of benefits */}
      <Tabs
        activeKey={activeTab}
        items={subscriptions.map((plan) => {
          const calculatedPrice = calculatePricePoint(
            isVentureCapitalCompany ? 'maxFundsize' : 'maxEmployees',
            isVentureCapitalCompany
              ? plan?.pricingVentureCapital
              : plan?.pricing,
            isVentureCapitalCompany ? company?.fundSize : company?.employeeCount
          )

          return {
            children: (
              <List
                dataSource={allFeatures}
                renderItem={(item) => {
                  const isEnabled =
                    plan.features.findIndex(
                      (f) => f.contentId === item.contentId
                    ) > -1
                  return (
                    <List.Item className={classNames({ disabled: !isEnabled })}>
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
                          {!isEnabled && <LockFilled />} {item?.title}
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
                  {calculatedPrice?.price}€
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

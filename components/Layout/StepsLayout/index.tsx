import { CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useScreenSize } from '../../../hooks/app'
import { Footer } from '../Footer'
require('./styles.less')

const { Content } = Layout
const { Step } = Steps

export const StepsLayout = ({
  canClose,
  children,
  currentStep = 0,
  onClose,
  steps,
}: {
  children: any
  canClose: boolean
  onClose: any
  currentStep?: any
  setStep?: any
  steps?: any
}) => {
  const screenSizeType = useScreenSize()
  const isMobile = screenSizeType === 'sm'

  return (
    <Layout className="steps-layout" style={{ minHeight: '100vh' }}>
      <Content>
        <div className="steps-layout-wrapper">
          <div className="logo">
            <Image
              alt="lfca-logo"
              layout="fill"
              src={'/logos/logo-dark-sm.svg'}
            />
          </div>
          <Steps
            current={currentStep}
            direction={'vertical'}
            size={isMobile ? 'small' : 'default'}
          >
            {steps?.map((step: any, i: any) => (
              <Step
                description={step.description}
                key={`step-${i}`}
                title={step.title}
              />
            ))}
          </Steps>
        </div>
        <div className="content-layout-wrapper">
          <header>
            {canClose && (
              <Popconfirm
                onConfirm={onClose}
                placement="left"
                title="Are you sure?"
              >
                <Button icon={<CloseOutlined />} type="link" />
              </Popconfirm>
            )}
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </Content>
    </Layout>
  )
}

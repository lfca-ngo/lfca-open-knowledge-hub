import { CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import React from 'react'

import { useScreenSize } from '../../../hooks/app'
import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import styles from './styles.module.less'

const { Content } = Layout
const { Step } = Steps

interface StepsLayoutProps {
  canClose: boolean
  children: React.ReactNode
  currentStepIndex: number
  onClose?: () => void
  steps: {
    description: string
    title: string
  }[]
}

export const StepsLayout = ({
  canClose,
  children,
  currentStepIndex,
  onClose,
  steps,
}: StepsLayoutProps) => {
  const screenSizeType = useScreenSize()
  const isMobile = screenSizeType === 'sm'

  return (
    <Layout className={styles['steps-layout']} style={{ minHeight: '100vh' }}>
      <Content>
        <div className="steps-layout-wrapper">
          <Logo size="large" />
          <Steps
            current={currentStepIndex}
            direction={'vertical'}
            size={isMobile ? 'small' : 'default'}
          >
            {steps?.map((step, i) => (
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

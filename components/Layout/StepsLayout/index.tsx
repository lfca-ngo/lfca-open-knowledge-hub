import { CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
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
      <Header>
        <Logo size="small" />
        <Steps
          current={currentStepIndex}
          size={isMobile ? 'small' : 'default'}
          type="navigation"
        >
          {steps?.map((step, i) => (
            <Step
              key={`step-${i}`}
              progressDot={() => null}
              title={step.title}
            />
          ))}
        </Steps>
        {canClose && (
          <Popconfirm
            onConfirm={onClose}
            placement="left"
            title="Are you sure?"
          >
            <Button icon={<CloseOutlined />} type="link" />
          </Popconfirm>
        )}
      </Header>
      <Content>
        <div className="content-layout-wrapper">
          <main>{children}</main>
          <Footer />
        </div>
      </Content>
    </Layout>
  )
}

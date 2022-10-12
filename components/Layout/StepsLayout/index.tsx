import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import classNames from 'classnames'
import React from 'react'

import { useScreenSize } from '../../../hooks/app'
import { Logo } from '../../Logo'
import { Container } from '../Container'
import { Footer } from '../Footer'
import styles from './styles.module.less'

const { Content } = Layout
const { Step } = Steps

interface StepsLayoutProps {
  asideChildren?: React.ReactNode
  canClose: boolean
  children: React.ReactNode
  currentStepIndex: number
  onClose?: () => void
  steps: {
    title: string
  }[]
}

export const StepsLayout = ({
  asideChildren,
  canClose,
  children,
  currentStepIndex,
  onClose,
  steps,
}: StepsLayoutProps) => {
  const screenSizeType = useScreenSize()
  const isMobile = screenSizeType === 'sm'

  return (
    <Layout
      className={classNames(styles['steps-layout'], {
        'has-sider': asideChildren,
      })}
      style={{ minHeight: '100vh' }}
    >
      <Header>
        <Logo size="small" />
        <div className="steps-wrapper">
          <Container alignment="center" size="lg">
            <Steps
              current={currentStepIndex}
              direction="horizontal"
              type="navigation"
            >
              {steps?.map((step, i) => (
                <Step
                  key={`step-${i}`}
                  progressDot={() => null}
                  title={
                    <div className="step-title">
                      <div className="title">{step.title}</div>
                      <ArrowRightOutlined />
                    </div>
                  }
                />
              ))}
            </Steps>
          </Container>
        </div>

        {canClose && (
          <Popconfirm
            onConfirm={onClose}
            placement="left"
            title="Are you sure?"
          >
            <Button
              className="close-icon"
              icon={<CloseOutlined />}
              type="link"
            />
          </Popconfirm>
        )}
      </Header>
      <Content className="content-layout-wrapper">
        <div className="content-wrapper">
          <main>{children}</main>
          {asideChildren && <aside>{asideChildren}</aside>}
        </div>

        <div className="color-bg" />
      </Content>
      <Footer />
    </Layout>
  )
}

import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import classNames from 'classnames'
import { ImageProps } from 'next/image'
import React from 'react'

import { Logo } from '../../Logo'
import { Container } from '../Container'
import { Footer } from '../Footer'
import styles from './styles.module.less'

const { Content } = Layout
const { Step } = Steps

interface StepsLayoutProps {
  asideChildren?: React.ReactNode
  backgroundImage?: ImageProps
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
  backgroundImage,
  canClose,
  children,
  currentStepIndex,
  onClose,
  steps,
}: StepsLayoutProps) => {
  const bgImageWidth = backgroundImage?.width || 0

  return (
    <Layout
      className={classNames(styles['steps-layout'], {
        'has-sider': asideChildren,
      })}
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
      <Content>
        <div className="content-wrapper">
          <main>{children}</main>
          {asideChildren && <aside>{asideChildren}</aside>}
        </div>
        {/* Needed for background styling on large screens */}
        <div
          className="color-bg"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage.src})`
              : 'none',
            backgroundSize: backgroundImage ? `calc(${bgImageWidth}px / 2)` : 0,
          }}
        />
      </Content>
      <Footer />
    </Layout>
  )
}

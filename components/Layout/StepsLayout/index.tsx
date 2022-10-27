import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Layout, Popconfirm, Steps } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import classNames from 'classnames'
import { ImageProps } from 'next/image'
import React, { useEffect, useRef } from 'react'

import { isBrowser } from '../../../utils'
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
  const headerRef = useRef<HTMLElement>(null)
  const bgImageWidth = backgroundImage?.width || 0

  useEffect(() => {
    // scroll the active element into view
    const stepEl = document.querySelector(
      `.ant-steps-item:nth-of-type(${currentStepIndex + 1})`
    ) as HTMLElement
    stepEl?.scrollIntoView()
  }, [currentStepIndex])

  return (
    <Layout
      className={classNames(styles['steps-layout'], {
        'has-sider': asideChildren,
      })}
    >
      <Header ref={headerRef}>
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
                    <div className="step-title" id={`step-${i}`}>
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
              ? `url(${backgroundImage.src}), linear-gradient(#fbf7f0, #F4F0E8)`
              : 'none',
            backgroundSize: backgroundImage ? `calc(${bgImageWidth}px / 2)` : 0,
          }}
        />
      </Content>
      <Footer />
    </Layout>
  )
}

import { Col, Layout, Row } from 'antd'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import AppPreview from '../../../public/img/app-preview.png'
import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import styles from './styles.module.less'

const { Content } = Layout

interface OneColLayoutProps {
  backgroundImage?: StaticImageData | string
  children?: React.ReactNode
}

export const OneColLayout = ({
  children,
  backgroundImage = AppPreview,
}: OneColLayoutProps) => {
  const [isDarkMode] = useDarkMode()

  return (
    <Layout className={styles['one-col-layout']} style={{ minHeight: '100vh' }}>
      <Content>
        <Row justify="center">
          <Col md={12} xs={24}>
            <div className="one-col-layout-wrapper">
              <header>
                <Logo
                  animated
                  size="large"
                  theme={isDarkMode ? 'dark' : 'light'}
                />
              </header>
              <main>{children}</main>
              <Footer />
            </div>
          </Col>
          <Col className="bg" md={12} xs={24}>
            <div className="bg-wrapper">
              <Image
                alt="app-preview"
                layout="fill"
                objectFit="contain"
                objectPosition="center right"
                priority={true}
                src={backgroundImage}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

import { Col, Layout, Row } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import AppPreview from '../../../public/img/app-preview.png'
import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import styles from './styles.module.less'

const { Content } = Layout

export const OneColLayout = ({ children }: { children: any }) => {
  const [isDarkMode] = useDarkMode()

  return (
    <Layout className="one-col-layout" style={{ minHeight: '100vh' }}>
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
                layout="fill"
                objectFit="contain"
                objectPosition="center right"
                src={AppPreview}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

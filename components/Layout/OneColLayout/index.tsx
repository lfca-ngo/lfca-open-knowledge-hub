import { Col, Layout, Row } from 'antd'
import Image from 'next/image'
import React from 'react'

import AppPreview from '../../../public/img/app-preview.png'
import LogoDark from '../../../public/logos/logo-dark.svg'
require('./styles.less')

const { Content } = Layout

export const OneColLayout = ({ children }: { children: any }) => {
  return (
    <Layout className="one-col-layout" style={{ minHeight: '100vh' }}>
      <Content>
        <Row justify="center">
          <Col md={12} xs={24}>
            <div className="one-col-layout-wrapper">
              <header>
                <div className="logo">
                  <LogoDark />
                </div>
              </header>
              <main>{children}</main>
              <footer>{`lfca.earth © ${new Date().getFullYear()}`}</footer>
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

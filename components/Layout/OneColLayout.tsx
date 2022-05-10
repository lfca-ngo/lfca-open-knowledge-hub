import { Col, Layout, Row } from 'antd'
import React from 'react'
import Image from 'next/image'
import AppPreview from '../../public/app-preview.png'
import LogoDark from '../../public/logo-dark.svg'
require('./styles.less')

const { Content, Footer } = Layout

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
              <main>
                {children}
              </main>
              <footer>
                {`lfca.earth © ${new Date().getFullYear()}`}
              </footer>
            </div>
          </Col>
          <Col md={12} xs={24} className='bg'>
            <div className='bg-wrapper'>
              <Image src={AppPreview} layout='fill' objectFit='contain' objectPosition='center right' />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

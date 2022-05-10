import { Col, Layout, Row } from 'antd'
import React from 'react'
require('./styles.less')

const { Content, Footer } = Layout

export const OneColLayout = ({ children }: { children: any }) => {
  return (
    <Layout className="background" style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content>
          <Row justify="center">
            <Col md={6} xs={24}>
              <div className="one-col-layout-wrapper">
                <div className="logo">Logo</div>
                {children}
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  )
}

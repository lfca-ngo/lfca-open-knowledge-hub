import {
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Button, Layout } from 'antd'
import React, { useState } from 'react'

import Logo from '../../public/logo.svg'
import { MainNav } from './MainNav'

require('./styles.less')

const { Content, Footer, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack }: SiderLayoutProps) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <Logo />
        </div>
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {goBack ? (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={goBack}
              style={{ color: 'black' }}
              type="link"
            >
              Back
            </Button>
          ) : (
            React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )
          )}
        </Header>
        <Content>
          <div className="site-layout-background">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  )
}

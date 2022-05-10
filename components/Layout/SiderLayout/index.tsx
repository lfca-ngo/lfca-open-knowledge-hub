import {
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Button, Layout } from 'antd'
import React, { useState } from 'react'

import LogoDark from '../../../public/logos/logo-dark-sm.svg'
import { MainNav } from '../MainNav'

require('./styles.less')

const { Content, Footer, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack }: SiderLayoutProps) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout className='sider-layout' hasSider style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        collapsedWidth={85}
        theme='light'
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <LogoDark />
        </div>
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
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
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  )
}

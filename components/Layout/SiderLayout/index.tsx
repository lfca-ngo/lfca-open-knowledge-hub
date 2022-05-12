import { Layout } from 'antd'
import React, { useState } from 'react'

import LogoDark from '../../../public/logos/logo-dark-sm.svg'
import { MainNav } from '../MainNav'
import { TopNav } from '../TopNav'
import { SettingsNav } from '../SettingsNav'

require('./styles.less')

const { Content, Footer, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  nav?: Array<any>,
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
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
        <div className='divider' />
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header>
          <TopNav nav={nav} goBack={goBack} />
          <SettingsNav />
        </Header>
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  )
}

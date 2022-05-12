import { Layout } from 'antd'
import React, { useEffect,useState } from 'react'

import { useScreenSize } from '../../../hooks/app'
import LogoDark from '../../../public/logos/logo-dark-sm.svg'
import { MainNav } from '../MainNav'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'

require('./styles.less')

const { Content, Footer, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  nav?: Array<any>
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const screenSizeType = useScreenSize()

  useEffect(() => {
    if (screenSizeType !== 'xl') setCollapsed(false)
  }, [screenSizeType])

  return (
    <Layout className="sider-layout" hasSider style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        collapsedWidth={85}
        collapsible
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        theme="light"
      >
        <div className="logo">
          <LogoDark />
        </div>
        <div className="divider" />
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header>
          <TopNav goBack={goBack} nav={nav} />
          <SettingsNav />
        </Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  )
}

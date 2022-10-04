import { Layout } from 'antd'
import React, { useState } from 'react'

import { useScreenSize } from '../../../hooks/app'
import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import { MainNav } from '../MainNav'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'
import styles from './styles.module.less'

const COLLAPSED_WIDTH = 85
const COLLAPSED_WIDTH_MOBILE = 0

const { Content, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  nav?: Array<any>
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
  const screenSizeType = useScreenSize()
  const [collapsed, setCollapsed] = useState(
    screenSizeType === 'xl' ? false : true
  )

  const collapsedWidth =
    screenSizeType === 'sm' ? COLLAPSED_WIDTH_MOBILE : COLLAPSED_WIDTH

  return (
    <Layout
      className={styles['sider-layout']}
      hasSider
      style={{ minHeight: '100vh' }}
    >
      <Sider
        breakpoint="xxl"
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        collapsible
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        theme="light"
      >
        <Logo />
        <div className="divider" />
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header>
          <TopNav goBack={goBack} nav={nav} />
          <SettingsNav />
        </Header>
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

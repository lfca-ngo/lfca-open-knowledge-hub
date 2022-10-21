import { Grid, Layout } from 'antd'
import React from 'react'

import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import { MainNav } from '../MainNav'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'
import styles from './styles.module.less'

const { useBreakpoint } = Grid

const COLLAPSED_WIDTH = 85
const COLLAPSED_WIDTH_MOBILE = 0

const { Content, Header, Sider } = Layout

interface SiderLayoutProps {
  children: React.ReactNode
  nav?: Array<any>
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
  const isDesktop = useBreakpoint().md
  const collapsedWidth = isDesktop ? COLLAPSED_WIDTH : COLLAPSED_WIDTH_MOBILE

  return (
    <Layout
      className={styles['sider-layout']}
      hasSider
      style={{ minHeight: '100vh' }}
    >
      <Sider
        breakpoint="xxl"
        collapsedWidth={collapsedWidth}
        collapsible
        theme="light"
      >
        <Logo centered />
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

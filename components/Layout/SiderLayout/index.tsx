import { Layout } from 'antd'
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import classNames from 'classnames'
import React, { useState } from 'react'

import { useBreakpoints } from '../../../hooks/useBreakpoints'
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
  nav?: MenuItemType[]
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
  const breakpoints = useBreakpoints()

  const isVeryLargeDesktop = breakpoints.xxl
  const isDesktop = breakpoints.lg

  const collapsedWidth = isDesktop ? COLLAPSED_WIDTH : COLLAPSED_WIDTH_MOBILE
  const [collapsed, setCollapsed] = useState(!isVeryLargeDesktop)

  return (
    <Layout
      className={classNames(styles['sider-layout'], {
        'is-collapsed': collapsed,
      })}
      hasSider
      style={{ minHeight: '100vh' }}
    >
      <Sider
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        collapsible
        onCollapse={(collapsed) => setCollapsed(collapsed)}
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

import { Grid, Layout } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { getBreakpoints } from '../../../utils'
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

const INITIAL_BREAKPOINTS = getBreakpoints()

interface SiderLayoutProps {
  children: React.ReactNode
  nav?: Array<any>
  goBack?: () => void
}

export const SiderLayout = ({ children, goBack, nav }: SiderLayoutProps) => {
  const breakpoints = useBreakpoint()

  const isVeryLargeDesktop =
    typeof breakpoints.xxl !== 'undefined'
      ? breakpoints.xxl
      : INITIAL_BREAKPOINTS.xxl
  const isDesktop =
    typeof breakpoints.lg !== 'undefined'
      ? breakpoints.lg
      : INITIAL_BREAKPOINTS.lg

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

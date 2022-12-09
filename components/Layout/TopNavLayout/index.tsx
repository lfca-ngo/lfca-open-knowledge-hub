import { Layout } from 'antd'
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import classNames from 'classnames'
import React from 'react'

import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'
import styles from './styles.module.less'

const { Content, Header } = Layout

interface TopNavLayoutProps {
  children: React.ReactNode
  aside?: React.ReactNode
  asidePosition?: 'right' | 'left'
  nav?: MenuItemType[]
  goBack?: () => void
}

export const TopNavLayout = ({
  aside,
  asidePosition = 'right',
  children,
  goBack,
  nav,
}: TopNavLayoutProps) => {
  const withAside = !!aside

  return (
    <Layout
      className={classNames(
        styles['top-nav-layout'],
        {
          [styles['with-aside']]: withAside,
        },
        asidePosition
      )}
    >
      <Header className={styles['top-nav-header']}>
        <Logo centered />
        <TopNav goBack={goBack} nav={nav} />
        <SettingsNav />
      </Header>
      {/* Left side bar */}
      {asidePosition === 'left' && aside && (
        <Content className={styles['top-nav-aside']}>{aside}</Content>
      )}
      {/* Main content */}
      <Content className={styles['top-nav-main']}>{children}</Content>
      {/* Right side bar */}
      {asidePosition === 'right' && aside && (
        <Content className={styles['top-nav-aside']}>{aside}</Content>
      )}
      <footer className={styles['top-nav-footer']}>Footer</footer>
      {/* <Footer  /> */}
    </Layout>
  )
}

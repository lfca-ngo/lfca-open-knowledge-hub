import { Layout } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { MAIN_NAV } from '../../../utils/navs'
import { Logo } from '../../Logo'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'
import { Aside } from './Aside'
import styles from './styles.module.less'

const { Content, Header } = Layout

export type AsidePosition = 'right' | 'left'

interface TopNavLayoutProps {
  children: React.ReactNode
  aside?: React.ReactNode
  asidePosition?: AsidePosition
  stickySidebar?: boolean
  goBack?: () => void
}

export const TopNavLayout = ({
  aside,
  asidePosition = 'right',
  children,
  goBack,
  stickySidebar,
}: TopNavLayoutProps) => {
  const withAside = !!aside

  return (
    <Layout
      className={classNames(styles['top-nav-layout'], {
        [styles['with-aside']]: withAside,
        [styles[`with-aside-${asidePosition}`]]: withAside,
      })}
    >
      <Header className={styles['top-nav-header']}>
        <Logo centered />
        <TopNav goBack={goBack} nav={MAIN_NAV} />
        <SettingsNav />
      </Header>

      {/* Main content */}
      <Content
        className={classNames(styles['top-nav-main'], {
          [styles[`with-aside-${asidePosition}`]]: withAside,
        })}
        style={{ width: 'auto' }}
      >
        {children}
      </Content>

      {/* Side bar */}
      {aside && (
        <Aside asidePosition={asidePosition} stickySidebar={stickySidebar}>
          {aside}
        </Aside>
      )}
      <footer className={styles['top-nav-footer']}>
        lfca.ngo © {`${new Date().getFullYear()}`}
      </footer>
    </Layout>
  )
}

import React from 'react'

import { MAIN_NAV } from '../../../utils/navs'
import { Logo } from '../../Logo'
import { SettingsNav } from '../SettingsNav'
import { TopNav } from '../TopNav'
import { Aside } from './Aside'
import styles from './styles.module.less'

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
  return (
    <div className={styles['layout']}>
      <div className={styles['header']}>
        <Logo centered />
        <TopNav goBack={goBack} nav={MAIN_NAV} />
        <SettingsNav />
      </div>
      <Aside asidePosition={asidePosition} stickySidebar={stickySidebar}>
        {aside}
      </Aside>
      <div className={styles['main']}>{children}</div>
      <footer className={styles['footer']}>
        lfca.ngo © {`${new Date().getFullYear()}`}
      </footer>
    </div>
  )
}

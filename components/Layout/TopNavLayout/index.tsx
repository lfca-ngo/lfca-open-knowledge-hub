import React from 'react'

import { Logo } from '../../Logo'
import { SettingsNav } from '../SettingsNav'
import { Aside } from './Aside'
import styles from './styles.module.less'

export type AsidePosition = 'right' | 'left'

interface TopNavLayoutProps {
  children: React.ReactNode
  aside?: React.ReactNode
  asidePosition?: AsidePosition
  filterBar?: React.ReactNode
  header?: React.ReactNode
  stickySidebar?: boolean
  goBack?: () => void
}

export const TopNavLayout = ({
  aside,
  asidePosition = 'right',
  children,
  filterBar,
  header,
  stickySidebar,
}: TopNavLayoutProps) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['header']}>
        <div className={styles['main-header']}>
          <div className={styles['header-left']}>
            <Logo centered />
          </div>
          <div className={styles['header-center']}>{header}</div>
          <div className={styles['header-right']}>
            <SettingsNav />
          </div>
        </div>
        {filterBar && <div className={styles['filter-bar']}>{filterBar}</div>}
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

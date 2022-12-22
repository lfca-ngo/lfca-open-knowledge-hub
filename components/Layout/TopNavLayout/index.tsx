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
  hero?: React.ReactNode
  stickySidebar?: boolean
  goBack?: () => void
}

export const TopNavLayout = ({
  aside,
  asidePosition = 'right',
  children,
  filterBar,
  header,
  hero,
  stickySidebar,
}: TopNavLayoutProps) => {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <div className={styles['main-header']}>
          <div className={styles['header-left']}>
            <Logo centered />
          </div>
          <div className={styles['header-center']}>
            <div className={styles['header-content']}>{header}</div>
          </div>
          <div className={styles['header-right']}>
            <SettingsNav />
          </div>
        </div>
        {filterBar && <div className={styles['filter-bar']}>{filterBar}</div>}
      </header>
      <div className={styles['hero']}>{hero}</div>
      <Aside asidePosition={asidePosition} stickySidebar={stickySidebar}>
        {aside}
      </Aside>
      <main className={styles['main']}>{children}</main>
      <footer className={styles['footer']}>
        lfca.ngo © {`${new Date().getFullYear()}`}
      </footer>
    </div>
  )
}

import React from 'react'

import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import { SettingsNav } from '../SettingsNav'
import styles from './styles.module.less'

export type AsidePosition = 'right' | 'left'

interface DetailPageLayoutProps {
  children: React.ReactNode
  aside?: React.ReactNode
  asidePosition?: AsidePosition
  filterBar?: React.ReactNode
  header?: React.ReactNode
  hero?: React.ReactNode
  stickySidebar?: boolean
  goBack?: () => void
}

export const DetailPageLayout = ({ children }: DetailPageLayoutProps) => {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <div className={styles['main-header']}>
          <div className={styles['header-left']}>
            <Logo centered />
          </div>
          <div className={styles['header-center']}>
            {/* <div className={styles['header-content']}>{header}</div> */}
          </div>
          <div className={styles['header-right']}>
            <SettingsNav />
          </div>
        </div>
      </header>

      <main className={styles['main']}>{children}</main>
      <footer className={styles['footer']}>
        <Footer />
      </footer>
    </div>
  )
}

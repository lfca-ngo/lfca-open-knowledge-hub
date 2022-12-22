import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

import { Logo } from '../../Logo'
import { Footer } from '../Footer'
import { SettingsNav } from '../SettingsNav'
import styles from './styles.module.less'

export type AsidePosition = 'right' | 'left'

interface DetailPageLayoutProps {
  children: React.ReactNode
  goBack?: () => void
}

export const DetailPageLayout = ({
  children,
  goBack,
}: DetailPageLayoutProps) => {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <div className={styles['main-header']}>
          <div className={styles['header-left']}>
            <Space size="large">
              <Logo centered />
              {goBack && <Button icon={<ArrowLeftOutlined />}>Back</Button>}
            </Space>
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

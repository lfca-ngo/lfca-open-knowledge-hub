import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { NAV_ITEMS_DEFAULT } from '../../../utils/navs'
import styles from './styles.module.less'

export const MainNav = () => {
  const router = useRouter()

  const items = NAV_ITEMS_DEFAULT

  const handleSelect = ({ key }: { key: string }) => {
    const isExternalLink = key.startsWith('http')
    // open external links in a new tab
    if (isExternalLink) {
      window.open(key, '_blank')
    } else {
      router.push(key)
    }
  }

  return (
    <Menu
      className={styles['main-menu']}
      inlineIndent={12}
      items={items}
      mode="inline"
      onSelect={handleSelect}
      selectedKeys={[router.pathname]}
      theme="light"
    />
  )
}

import { Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { useUser } from '../../../hooks/user'
import {
  NAV_ITEMS_ADMIN,
  NAV_ITEMS_BEHIND_PAYWALL,
  NAV_ITEMS_DEFAULT,
} from '../../../utils/navs'
import { PaywallPopover } from '../../PayWall/PaywallPopover'
import styles from './styles.module.less'

export const MainNav = () => {
  const { isAdmin, isPaying } = useUser()

  const router = useRouter()

  const addPaywall = (item: ItemType) => {
    if (NAV_ITEMS_BEHIND_PAYWALL.indexOf(`${item?.key}`) > -1) {
      return {
        ...item,
        children: null,
        disabled: true,
        icon:
          item && 'icon' in item ? (
            <PaywallPopover>
              <>{item?.icon}</>
            </PaywallPopover>
          ) : null,
        key: `${item?.key}`,
      }
    } else return item
  }

  const items = useMemo(() => {
    let menuItems = NAV_ITEMS_DEFAULT
    if (isAdmin) {
      menuItems = [...NAV_ITEMS_DEFAULT, ...NAV_ITEMS_ADMIN]
    }
    if (!isPaying) {
      menuItems = menuItems.map(addPaywall)
    }
    return menuItems
  }, [isAdmin, isPaying]) as ItemType[]

  const handleSelect = ({ key }: { key: string }) => {
    router.push(key)
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

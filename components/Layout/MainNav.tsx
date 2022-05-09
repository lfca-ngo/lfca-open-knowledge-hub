import { HomeOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { HOME } from '../../utils/routes'

const NAV_ITEMS = [
  {
    icon: <HomeOutlined />,
    key: HOME,
    label: 'All Campaigns',
  },
]

export const MainNav = () => {
  const router = useRouter()

  const handleSelect = (item: any) => {
    router.push(item.key)
  }

  return (
    <Menu
      items={NAV_ITEMS}
      mode="inline"
      onSelect={handleSelect}
      selectedKeys={[router.pathname]}
      theme="dark"
    />
  )
}

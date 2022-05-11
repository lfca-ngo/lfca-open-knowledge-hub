import { HomeOutlined, RocketOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { ACTIONS, ACTIONS_COMPLETED, ACTIONS_PLANNED, ACHIEVEMENTS } from '../../utils/routes'

const NAV_ITEMS = [
  {
    icon: <ProfileOutlined />,
    key: ACTIONS,
    label: 'Dashboard',
    children: [
      {
        icon: <RocketOutlined />,
        key: ACTIONS_PLANNED,
        label: 'Actions planned',
      },
      {
        icon: <RocketOutlined />,
        key: ACTIONS_COMPLETED,
        label: 'Actions completed',
      }
    ]
  },
  {
    icon: <RocketOutlined />,
    key: ACHIEVEMENTS,
    label: 'Achievements',
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
      theme="light"
    />
  )
}

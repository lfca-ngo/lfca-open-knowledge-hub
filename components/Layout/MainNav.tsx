import { UsergroupAddOutlined, BankOutlined, RocketOutlined, ProfileOutlined, LockOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { ACTIONS, ACTIONS_COMPLETED, ACTIONS_PLANNED, ACHIEVEMENTS, ADMIN_COMPANIES, ADMIN_USERS, ADMIN } from '../../utils/routes'

const NAV_ITEMS = [
  {
    icon: <ProfileOutlined />,
    key: ACTIONS,
    label: 'Dashboard',
    children: [
      {
        icon: <ProfileOutlined />,
        key: ACTIONS,
        label: 'Dashboard',
      },
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
  {
    icon: <LockOutlined />,
    key: ADMIN,
    label: 'Admin',
    children: [
      {
        icon: <UsergroupAddOutlined />,
        key: ADMIN_USERS,
        label: 'Users',
      },
      {
        icon: <BankOutlined />,
        key: ADMIN_COMPANIES,
        label: 'Companies',
      },
    ]
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

import {
  BankOutlined,
  LockOutlined,
  ProfileOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import {
  ACHIEVEMENTS,
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN,
  ADMIN_COMPANIES,
  ADMIN_USERS,
} from '../../utils/routes'

const NAV_ITEMS = [
  {
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
      },
    ],
    icon: <ProfileOutlined />,
    key: 'dashboard',
    label: 'Dashboard',
  },
  {
    icon: <RocketOutlined />,
    key: ACHIEVEMENTS,
    label: 'Achievements',
  },
  {
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
    ],
    icon: <LockOutlined />,
    key: ADMIN,
    label: 'Admin',
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

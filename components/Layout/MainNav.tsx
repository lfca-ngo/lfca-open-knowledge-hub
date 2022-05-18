import {
  BankOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  LockOutlined,
  ProfileOutlined,
  RocketOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { useUser } from '../../hooks/user'
import {
  ACHIEVEMENTS,
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN,
  ADMIN_COMPANIES,
  ADMIN_USERS,
} from '../../utils/routes'

const NAV_ITEMS_DEFAULT: MenuProps['items'] = [
  {
    children: [
      {
        icon: <ProfileOutlined />,
        key: ACTIONS,
        label: 'Dashboard',
      },
      {
        icon: <CalendarOutlined />,
        key: ACTIONS_PLANNED,
        label: 'Actions planned',
      },
      {
        icon: <CheckCircleOutlined />,
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
]

const NAV_ITEMS_ADMIN = [
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
  const [items, setItems] =
    React.useState<MenuProps['items']>(NAV_ITEMS_DEFAULT)
  const { isAdmin } = useUser()

  const router = useRouter()

  React.useEffect(() => {
    if (isAdmin) {
      setItems([...NAV_ITEMS_DEFAULT, ...NAV_ITEMS_ADMIN])
    } else {
      setItems(NAV_ITEMS_DEFAULT)
    }
  }, [isAdmin])

  return (
    <Menu
      items={items}
      mode="inline"
      onSelect={(item) => {
        router.push(item.key)
      }}
      selectedKeys={[router.pathname]}
      theme="light"
    />
  )
}

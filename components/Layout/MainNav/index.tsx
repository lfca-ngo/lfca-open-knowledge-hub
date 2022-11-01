import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BankOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  InsertRowLeftOutlined,
  LockOutlined,
  MessageOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SettingOutlined,
  ShareAltOutlined,
  StarOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { useUser } from '../../../hooks/user'
import {
  ACHIEVEMENTS,
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN,
  ADMIN_ACTIONS,
  ADMIN_COMMENTS,
  ADMIN_COMPANIES,
  ADMIN_GROUPS,
  ADMIN_REVIEWS,
  ADMIN_SETTINGS,
  ADMIN_USERS,
  COMMUNITY_GROUPS,
  PERSONAL_FOOTPRINT_CALCULATOR,
  REFERRAL_PROGRAM,
  SERVICE_PROVIDERS,
  SUPPORT,
  TOOLS,
  USEFUL_LINKS,
} from '../../../utils/routes'
import { PaywallPopover } from '../../PayWall/PaywallPopover'
import styles from './styles.module.less'

const NAV_ITEMS_BEHIND_PAYWALL = [ACHIEVEMENTS, TOOLS]

const NAV_ITEMS_DEFAULT: MenuProps['items'] = [
  {
    children: [
      {
        icon: <ProfileOutlined />,
        key: ACTIONS,
        label: 'Overview',
      },
      {
        icon: <CalendarOutlined />,
        key: ACTIONS_PLANNED,
        label: 'Planned actions',
      },
      {
        icon: <CheckCircleOutlined />,
        key: ACTIONS_COMPLETED,
        label: 'Completed actions',
      },
    ],
    icon: <CarryOutOutlined />,
    key: 'dashboard',
    label: 'Knowledge Hub',
  },
  {
    icon: <TeamOutlined />,
    key: COMMUNITY_GROUPS,
    label: 'Mastermind Groups',
  },
  {
    icon: <RocketOutlined />,
    key: ACHIEVEMENTS,
    label: 'Achievements',
  },
  {
    children: [
      {
        icon: <AppstoreAddOutlined />,
        key: SERVICE_PROVIDERS,
        label: 'Tool Comparison',
      },
      {
        icon: <CalculatorOutlined />,
        key: PERSONAL_FOOTPRINT_CALCULATOR,
        label: 'Personal Footprint Calculator',
      },
      {
        icon: <ShareAltOutlined />,
        key: REFERRAL_PROGRAM,
        label: 'Referral',
      },
      {
        icon: <ProfileOutlined />,
        key: USEFUL_LINKS,
        label: 'Links',
      },
      {
        icon: <QuestionCircleOutlined />,
        key: SUPPORT,
        label: 'Help',
      },
    ],
    icon: <InsertRowLeftOutlined />,
    key: TOOLS,
    label: 'Quick Access',
  },
]

const NAV_ITEMS_ADMIN: MenuProps['items'] = [
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
      {
        icon: <TeamOutlined />,
        key: ADMIN_GROUPS,
        label: 'Groups',
      },
      {
        icon: <StarOutlined />,
        key: ADMIN_REVIEWS,
        label: 'Reviews',
      },
      {
        icon: <MessageOutlined />,
        key: ADMIN_COMMENTS,
        label: 'Comments',
      },
      {
        icon: <AppstoreOutlined />,
        key: ADMIN_ACTIONS,
        label: 'Actions',
      },
      {
        icon: <SettingOutlined />,
        key: ADMIN_SETTINGS,
        label: 'Settings',
      },
    ],
    icon: <LockOutlined />,
    key: ADMIN,
    label: 'Admin',
  },
]

export const MainNav = () => {
  const { isAdmin, isPaying } = useUser()

  const router = useRouter()

  const addPaywall = (item: any) => {
    if (NAV_ITEMS_BEHIND_PAYWALL.indexOf(item.key) > -1) {
      return {
        ...item,
        disabled: true,
        icon: <PaywallPopover>{item.icon}</PaywallPopover>,
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
  }, [isAdmin, isPaying]) as MenuProps['items']

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

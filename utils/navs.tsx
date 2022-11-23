import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BankOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  InsertRowLeftOutlined,
  LikeOutlined,
  LoadingOutlined,
  LockOutlined,
  LogoutOutlined,
  MessageOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SettingOutlined,
  ShareAltOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

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
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
  SETTINGS_SUBSCRIPTION,
  SUPPORT,
  TOOLS,
  USEFUL_LINKS,
} from './routes'

export const LOGOUT = 'logout'

export const ACTIONS_NAV = [
  { icon: <ProfileOutlined />, key: ACTIONS, label: 'Dashboard' },
  {
    icon: <CalendarOutlined />,
    key: ACTIONS_PLANNED,
    label: 'Planned Actions',
  },
  {
    icon: <CheckCircleOutlined />,
    key: ACTIONS_COMPLETED,
    label: 'Completed Actions',
  },
]

export const ADMIN_NAV = [
  { icon: <UsergroupAddOutlined />, key: ADMIN_USERS, label: 'Users' },
  { icon: <BankOutlined />, key: ADMIN_COMPANIES, label: 'Companies' },
  { icon: <TeamOutlined />, key: ADMIN_GROUPS, label: 'Events' },
  { icon: <StarOutlined />, key: ADMIN_REVIEWS, label: 'Reviews' },
  { icon: <MessageOutlined />, key: ADMIN_COMMENTS, label: 'Comments' },
  { icon: <AppstoreOutlined />, key: ADMIN_ACTIONS, label: 'Actions' },
  { icon: <SettingOutlined />, key: ADMIN_SETTINGS, label: 'Settings' },
]

export const SETTINGS_NAV = [
  { key: SETTINGS, label: 'Edit Profile' },
  { key: SETTINGS_COMPANY, label: 'Edit Company' },
  { key: SETTINGS_INVITE, label: 'Invite Team' },
  { key: SETTINGS_SUBSCRIPTION, label: 'Your membership' },
]

export const OTHER_NAV = [
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
]

export const PROFILE_NAV = (loading: boolean) => [
  {
    icon: <UserOutlined />,
    key: SETTINGS,
    label: 'Edit Profile',
  },
  {
    icon: <BankOutlined />,
    key: SETTINGS_COMPANY,
    label: 'Edit Company',
  },
  {
    icon: <LikeOutlined />,
    key: SETTINGS_INVITE,
    label: 'Invite Team',
  },
  {
    icon: <ThunderboltOutlined />,
    key: SETTINGS_SUBSCRIPTION,
    label: 'Your membership',
  },
  {
    icon: <QuestionCircleOutlined />,
    key: SUPPORT,
    label: 'Need help?',
  },
  {
    icon: loading ? <LoadingOutlined /> : <LogoutOutlined />,
    key: LOGOUT,
    label: 'Logout',
  },
]

export const NAV_ITEMS_BEHIND_PAYWALL = [ACHIEVEMENTS, TOOLS]

export const NAV_ITEMS_DEFAULT: ItemType[] = [
  {
    children: ACTIONS_NAV,
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
    children: OTHER_NAV,
    icon: <InsertRowLeftOutlined />,
    key: TOOLS,
    label: 'Quick Access',
  },
]

export const NAV_ITEMS_ADMIN: ItemType[] = [
  {
    children: ADMIN_NAV,
    icon: <LockOutlined />,
    key: ADMIN,
    label: 'Admin',
  },
]

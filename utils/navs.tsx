import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  BankOutlined,
  CalendarOutlined,
  HomeOutlined,
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
  SlackOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

import { OPEN_SLACK_LINK, SLACK_INVITE_URL } from '.'
import {
  ACHIEVEMENTS,
  ACTIONS,
  ADMIN,
  ADMIN_ACTIONS,
  ADMIN_COMMENTS,
  ADMIN_COMPANIES,
  ADMIN_GROUPS,
  ADMIN_REVIEWS,
  ADMIN_SETTINGS,
  ADMIN_USERS,
  COMMUNITY_GROUPS,
  REFERRAL_PROGRAM,
  SERVICE_PROVIDERS,
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
  SETTINGS_SUBSCRIPTION,
  SUPPORT,
  TOOLS,
} from './routes'

export const LOGOUT = 'logout'

export const MAIN_NAV = [
  { icon: <ProfileOutlined />, key: ACTIONS, label: 'Actions' },
  {
    icon: <CalendarOutlined />,
    key: ACHIEVEMENTS,
    label: 'Programs',
  },
  {
    icon: <HomeOutlined />,
    key: TOOLS,
    label: 'Tools',
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

export const SLACK_NAV: ItemType[] = [
  {
    icon: <ArrowRightOutlined />,
    key: OPEN_SLACK_LINK,
    label: 'Open',
  },
  {
    icon: <ShareAltOutlined />,
    key: SLACK_INVITE_URL,
    label: 'Register',
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

export const NAV_ITEMS_BEHIND_PAYWALL = [ACHIEVEMENTS, TOOLS, SERVICE_PROVIDERS]

export const NAV_ITEMS_DEFAULT: ItemType[] = [
  {
    icon: <TeamOutlined />,
    key: COMMUNITY_GROUPS,
    label: 'Groups & Events',
  },
  {
    icon: <RocketOutlined />,
    key: ACHIEVEMENTS,
    label: 'Achievements',
  },
  {
    icon: <AppstoreAddOutlined />,
    key: SERVICE_PROVIDERS,
    label: 'Tool Comparison',
  },
  {
    icon: <ShareAltOutlined />,
    key: REFERRAL_PROGRAM,
    label: 'Referral',
  },
  {
    children: SLACK_NAV,
    icon: <SlackOutlined />,
    key: 'slack',
    label: 'Slack',
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

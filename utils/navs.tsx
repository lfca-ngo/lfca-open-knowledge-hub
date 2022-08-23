import {
  BankOutlined,
  LikeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons'

import {
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN_ACTIONS,
  ADMIN_COMPANIES,
  ADMIN_GROUPS,
  ADMIN_REVIEWS,
  ADMIN_USERS,
  COMMUNITY_GROUPS,
  COMMUNITY_LINKS,
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
  SETTINGS_SUBSCRIPTION,
} from './routes'

export const LOGOUT = 'logout'

export const ACTIONS_NAV = [
  { path: ACTIONS, title: 'Dashboard' },
  { path: ACTIONS_PLANNED, title: 'Planned Actions' },
  { path: ACTIONS_COMPLETED, title: 'Completed Actions' },
]

export const ADMIN_NAV = [
  { path: ADMIN_USERS, title: 'Users' },
  { path: ADMIN_COMPANIES, title: 'Companies' },
  { path: ADMIN_GROUPS, title: 'Groups' },
  { path: ADMIN_REVIEWS, title: 'Reviews' },
  { path: ADMIN_ACTIONS, title: 'Actions' },
]

export const COMMUNITY_NAV = [
  { path: COMMUNITY_LINKS, title: 'Links' },
  { path: COMMUNITY_GROUPS, title: 'Groups' },
]

export const SETTINGS_NAV = [
  { path: SETTINGS, title: 'Edit Profile' },
  { path: SETTINGS_COMPANY, title: 'Edit Company' },
  { path: SETTINGS_INVITE, title: 'Invite Team' },
  { path: SETTINGS_SUBSCRIPTION, title: 'Your Subscription' },
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
    label: 'Your Subscription',
  },
  {
    icon: loading ? <LoadingOutlined /> : <LogoutOutlined />,
    key: LOGOUT,
    label: 'Logout',
  },
]

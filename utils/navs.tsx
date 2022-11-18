import {
  BankOutlined,
  LikeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons'

import {
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN_ACTIONS,
  ADMIN_COMMENTS,
  ADMIN_COMPANIES,
  ADMIN_GROUPS,
  ADMIN_REVIEWS,
  ADMIN_SETTINGS,
  ADMIN_USERS,
  COMMUNITY_GROUPS,
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
  SETTINGS_SUBSCRIPTION,
  SUPPORT,
} from './routes'

export const LOGOUT = 'logout'

export const ACTIONS_NAV = [
  { key: ACTIONS, label: 'Dashboard' },
  { key: ACTIONS_PLANNED, label: 'Planned Actions' },
  { key: ACTIONS_COMPLETED, label: 'Completed Actions' },
]

// {
//   icon: <AppstoreAddOutlined />,
//   key: SERVICE_PROVIDERS,
//   label: 'Tool Comparison',
// }

export const ADMIN_NAV = [
  { key: ADMIN_USERS, label: 'Users' },
  { key: ADMIN_COMPANIES, label: 'Companies' },
  { key: ADMIN_GROUPS, label: 'Events' },
  { key: ADMIN_REVIEWS, label: 'Reviews' },
  { key: ADMIN_COMMENTS, label: 'Comments' },
  { key: ADMIN_ACTIONS, label: 'Actions' },
  { key: ADMIN_SETTINGS, label: 'Settings' },
]

export const COMMUNITY_NAV = [{ key: COMMUNITY_GROUPS, label: 'Groups' }]

export const SETTINGS_NAV = [
  { key: SETTINGS, label: 'Edit Profile' },
  { key: SETTINGS_COMPANY, label: 'Edit Company' },
  { key: SETTINGS_INVITE, label: 'Invite Team' },
  { key: SETTINGS_SUBSCRIPTION, label: 'Your membership' },
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

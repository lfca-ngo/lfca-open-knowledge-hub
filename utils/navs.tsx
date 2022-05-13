import {
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN_COMPANIES,
  ADMIN_USERS,
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
} from './routes'

export const ACTIONS_NAV = [
  { path: ACTIONS, title: 'Dashboard' },
  { path: ACTIONS_PLANNED, title: 'Planned Actions' },
  { path: ACTIONS_COMPLETED, title: 'Completed Actions' },
]

export const ADMIN_NAV = [
  { path: ADMIN_USERS, title: 'Users' },
  { path: ADMIN_COMPANIES, title: 'Companies' },
]

export const SETTINGS_NAV = [
  { path: SETTINGS, title: 'Edit Profile' },
  { path: SETTINGS_COMPANY, title: 'Edit Company' },
  { path: SETTINGS_INVITE, title: 'Invite Team' },
]

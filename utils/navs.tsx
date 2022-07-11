import {
  ACTIONS,
  ACTIONS_COMPLETED,
  ACTIONS_PLANNED,
  ADMIN_ACTIONS,
  ADMIN_COMPANIES,
  ADMIN_REVIEWS,
  ADMIN_USERS,
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
  SETTINGS_PLAN,
} from './routes'

export const ACTIONS_NAV = [
  { path: ACTIONS, title: 'Dashboard' },
  { path: ACTIONS_PLANNED, title: 'Planned Actions' },
  { path: ACTIONS_COMPLETED, title: 'Completed Actions' },
]

export const ADMIN_NAV = [
  { path: ADMIN_USERS, title: 'Users' },
  { path: ADMIN_COMPANIES, title: 'Companies' },
  { path: ADMIN_REVIEWS, title: 'Reviews' },
  { path: ADMIN_ACTIONS, title: 'Actions' },
]

export const SETTINGS_NAV = [
  { path: SETTINGS, title: 'Edit Profile' },
  { path: SETTINGS_COMPANY, title: 'Edit Company' },
  { path: SETTINGS_INVITE, title: 'Invite Team' },
  { path: SETTINGS_PLAN, title: 'Your Plan' },
]

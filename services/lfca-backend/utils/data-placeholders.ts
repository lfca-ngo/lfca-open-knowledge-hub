import {
  CompanyAchievementFragment,
  CompanyActionListItemFragment,
  EventFragment,
  EventStatus,
} from '../generated'

// to simulate the skeleton loader we ned to fill the list with dummy data
export const EMPTY_ACTION: CompanyActionListItemFragment = {
  categories: [],
  commentAttachmentCount: 0,
  commentCount: 0,
  companiesCompletedCount: 0,
  companiesPlannedCount: 0,
  completedAt: null,
  contentId: '',
  customSections: [],
  heroImage: {
    id: '',
    url: '',
  },
  id: '',
  impactValue: 0,
  recentCompaniesCompleted: [],
  recommendedForCompanyAchievementIds: [],
  requiredForCompanyAchievementIds: [''], // needs at least one item to show skeleton on required actions
  requirements: [],
  title: '',
}

// create array with 10 empty actions
export const EMPTY_ACTIONS = Array(10).fill(EMPTY_ACTION)

// empty achievements object
export const EMPTY_ACHIEVEMENT: CompanyAchievementFragment = {
  completedCompanyActionsCount: 0,
  completedRequiredCompanyActionsCount: 0,
  contentId: '',
  editableCompanyProperties: [''],
  minCompletedCompanyActionsCount: 0,
  name: '',
  recommendedActions: [],
  requiredActions: [],
}

// create array with 2 empty achievements
export const EMPTY_ACHIEVEMENTS = Array(2).fill(EMPTY_ACHIEVEMENT)

// empty event object
export const EMPTY_EVENT: EventFragment = {
  end: '',
  id: '',
  isAllDay: false,
  participationRequestsApprovedCount: 0,
  participationRequestsPendingCount: 0,
  participationRequestStatus: null,
  recurrence: null,
  start: '',
  status: EventStatus.UPCOMING,
  title: '',
}

// create array with 2 empty events
export const EMPTY_EVENTS = Array(2)
  .fill(EMPTY_EVENT)
  .concat(
    Array(2).fill({ ...EMPTY_EVENT, participationRequestStatus: 'APPROVED' })
  )

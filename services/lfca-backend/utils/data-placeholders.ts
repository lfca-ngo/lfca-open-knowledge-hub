import { CompanyActionListItemFragmentWithRootCategory } from '../../../components/ActionsCarousel'
import {
  ActionComment,
  CompanyAchievementFragment,
  EventCategory,
  EventStatus,
  EventWithParticipantsFragment,
} from '../generated'

// to simulate the skeleton loader we ned to fill the list with dummy data
export const EMPTY_ACTION: CompanyActionListItemFragmentWithRootCategory = {
  categories: [{ id: 'software-it', name: 'Software it' }],
  commentAttachmentCount: 0,
  commentCount: 0,
  companiesDoingCount: 0,
  completedAt: null,
  contentId: '',
  heroImage: {
    id: '',
    url: '',
  },
  id: '',
  impactValue: 0,
  recentCompaniesDoing: [],
  recommendedForCompanyAchievementIds: [],
  requiredForCompanyAchievementIds: [''], // needs at least one item to show skeleton on required actions
  requirements: [],
  rootCategory: 'tree-step-up',
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
export const EMPTY_EVENT: EventWithParticipantsFragment = {
  category: EventCategory.MASTERMIND_GROUP,
  description: '',
  end: '',
  id: '',
  participants: [],
  participantsAwaitingAdminApprovalCount: 0,
  participantsAwaitingUserRSVPCount: 0,
  participantsUserRSVPAcceptedCount: 0,
  participantsUserRSVPDeclinedCount: 0,
  participationStatus: null,
  recurrenceRule: null,
  remindersBeforeStart: [],
  start: '',
  status: EventStatus.UPCOMING,
  title: '',
  videoConferenceUrl: '',
}

// create array with 2 empty events
export const EMPTY_EVENTS: EventWithParticipantsFragment[] = Array(2)
  .fill(EMPTY_EVENT)
  .concat(
    Array(2).fill({ ...EMPTY_EVENT, participationRequestStatus: 'APPROVED' })
  )

export const EMPTY_COMMENT = {
  id: '0',
  message: '',
} as ActionComment

export const EMPTY_COMMENTS = Array(3).fill(EMPTY_COMMENT)

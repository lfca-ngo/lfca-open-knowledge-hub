import {
  CompanyAchievementFragment,
  CompanyActionListItemFragment,
} from '../lfca-backend/generated'

// to simulate the skeleton loader we ned to fill the list with dummy data
export const EMPTY_ACTION: CompanyActionListItemFragment = {
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
  tags: [],
  title: '',
}

// create array with 10 empty actions
export const EMPTY_ACTIONS_ARRAY = Array(10).fill(EMPTY_ACTION)

// empty achievements object
export const EMPTY_ACHIEVEMENTS_OBJECT: CompanyAchievementFragment = {
  completedCompanyActionsCount: 0,
  completedRequiredCompanyActionsCount: 0,
  contentId: '',
  minCompletedCompanyActionsCount: 0,
  name: '',
  recommendedActions: [],
  requiredActions: [],
}

// create array with 2 empty achievements
export const EMPTY_ACHIEVEMENTS_ARRAY = Array(2).fill(EMPTY_ACHIEVEMENTS_OBJECT)

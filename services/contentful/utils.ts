import { CompanyActionListItemFragment } from '../lfca-backend/generated'

// to simulate the skeleton loader we ned to fill the list with dummy data
export const EMPTY_ACTION: CompanyActionListItemFragment = {
  companiesCompletedCount: 0,
  companiesPlannedCount: 0,
  completedAt: null,
  contentId: '',
  heroImage: {
    id: '',
    url: '',
  },
  id: '',
  recentCompaniesCompleted: [],
  recommendedForCompanyAchievementIds: [],
  requiredForCompanyAchievementIds: [''], // needs at least one item to show skeleton on required actions
  tags: [],
  title: '',
}

// create array with 10 empty actions
export const EMPTY_ACTIONS_ARRAY = Array(10).fill(EMPTY_ACTION)

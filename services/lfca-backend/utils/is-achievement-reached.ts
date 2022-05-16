import { CompanyAchievementMiniFragment } from '../generated'

export const isAchievementReached = (
  achievement: CompanyAchievementMiniFragment
): boolean => {
  const hasReachedMinActionsCount =
    achievement.completedCompanyActionsCount >=
    (achievement.minCompletedCompanyActionsCount || 0)
  const hasReachedMandatoryActionsCount =
    achievement.completedRequiredCompanyActionsCount >=
    achievement.requiredActions.length

  return hasReachedMinActionsCount && hasReachedMandatoryActionsCount
}

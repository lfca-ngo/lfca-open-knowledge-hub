import { CompanyActionListItemFragment } from '../generated'

export const ALL_ACTIONS_LABEL = 'All actions'

export const sortCompanyActionsByCategories = (
  companyActions: CompanyActionListItemFragment[],
  filterCompleted = true
): Record<string, CompanyActionListItemFragment[]> => {
  return companyActions.reduce((acc, curr) => {
    if (!acc[ALL_ACTIONS_LABEL]) acc[ALL_ACTIONS_LABEL] = []

    // if an action is completed, it should not be shown in the list
    if (filterCompleted && curr?.completedAt) return acc

    acc[ALL_ACTIONS_LABEL].push(curr)

    curr.categories.forEach((category) => {
      if (category.name)
        acc[category.name] = [...(acc[category.name] || []), curr]
    })

    return acc
  }, {} as Record<string, CompanyActionListItemFragment[]>)
}

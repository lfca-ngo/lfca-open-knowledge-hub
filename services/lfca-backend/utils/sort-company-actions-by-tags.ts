import { CompanyActionListItemFragment } from '../generated'

export const ALL_ACTIONS_LABEL = 'All actions'

export const sortCompanyActionsByTag = (
  companyActions: CompanyActionListItemFragment[]
): Record<string, CompanyActionListItemFragment[]> => {
  return companyActions.reduce((acc, curr) => {
    if (!acc[ALL_ACTIONS_LABEL]) acc[ALL_ACTIONS_LABEL] = []
    acc[ALL_ACTIONS_LABEL].push(curr)
    curr.tags.forEach((tag) => {
      if (tag.name) acc[tag.name] = [...(acc[tag.name] || []), curr]
    })

    return acc
  }, {} as Record<string, CompanyActionListItemFragment[]>)
}

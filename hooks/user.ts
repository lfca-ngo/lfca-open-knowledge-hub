import { useMemo } from 'react'

import { useUserQuery } from '../services/lfca-backend'
import { isVentureCapitalCompany } from '../utils'

export const useUser = () => {
  const [{ data, error, fetching }] = useUserQuery()
  const company = data?.user.company

  // for vc's we apply a different pricing
  const isVC = useMemo(
    () =>
      company?.tags
        ? isVentureCapitalCompany(company.tags.map((t) => t.name))
        : null,
    [company?.tags]
  )

  return {
    company: company,
    error,
    fetching,
    isAdmin: !!data?.user.roles.includes('ADMIN'),
    isLeader: !!data?.user.roles.includes('LEADER'),
    isOfficer: !!data?.user.roles.includes('OFFICER'),
    isPaying: company?.subscriptionType !== 'FREE',
    isVentureCapitalCompany: isVC,
    program: company?.programContentId,
    subscriptionType: data?.user.company?.subscriptionType,
    user: data?.user,
  }
}

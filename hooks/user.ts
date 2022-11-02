import { useMemo } from 'react'

import { useUserQuery } from '../services/lfca-backend'

export const useUser = () => {
  const [{ data, error, fetching }] = useUserQuery()
  const company = data?.user.company

  // for vc's we apply a different pricing
  const isVentureCapitalCompany = useMemo(
    () =>
      company?.tags ? !!company?.tags?.find((t) => t.name === 'vc') : null,
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
    isVentureCapitalCompany,
    program: company?.programContentId,
    subscriptionType: data?.user.company?.subscriptionType,
    user: data?.user,
  }
}

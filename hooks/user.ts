import { useUserQuery } from '../services/lfca-backend'

export const useUser = () => {
  const [{ data, error, fetching }] = useUserQuery()

  return {
    company: data?.user.company,
    error,
    fetching,
    isAdmin: !!data?.user.roles.includes('ADMIN'),
    isLeader: !!data?.user.roles.includes('LEADER'),
    isOfficer: !!data?.user.roles.includes('OFFICER'),
    isPaying: data?.user.company?.subscriptionType !== 'FREE',
    program: data?.user.company?.programContentId,
    subscriptionType: data?.user.company?.subscriptionType,
    user: data?.user,
  }
}

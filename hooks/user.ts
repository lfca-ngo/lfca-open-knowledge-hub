import { useUserQuery } from '../services/lfca-backend'

export const useUser = () => {
  const [{ data, error, fetching }] = useUserQuery()

  /**
   * TODO: Replace with whatever attribute you decide
   * to use on the backend to track the subscription
   * type of a company. Should not be a "user" but a
   * "company" attribute
   */

  return {
    company: data?.user.company,
    error,
    fetching,
    isAdmin: !!data?.user.roles.includes('ADMIN'),
    isLeader: !!data?.user.roles.includes('LEADER'),
    isOfficer: !!data?.user.roles.includes('OFFICER'),
    // below can be changed
    isPaying: false, // data?.user.subscriptionType === ('Basic' || 'Premium'),
    program: data?.user.company?.programContentId,
    // below can be changed
    subscriptionType: 'Basic', // data?.user.subscriptionType,
    user: data?.user,
  }
}

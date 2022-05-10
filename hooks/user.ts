import { useUserQuery } from '../services/lfca-backend'

export const useUser = () => {
  const [{ data, error, fetching }] = useUserQuery()

  return {
    error,
    fetching,
    user: data?.user,
  }
}

import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { firebaseAuth } from '../services/firebase'
import { SIGN_IN } from '../utils/routes'

export const useAuth = () => {
  const [user, loading, error] = useAuthState(firebaseAuth)
  const router = useRouter()

  if (!loading && !user) {
    router.replace(SIGN_IN)
  }

  return {
    error,
    loading,
    ...user,
  }
}

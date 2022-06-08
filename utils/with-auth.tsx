import { useRouter } from 'next/router'
import React from 'react'

import { useFirebase } from '../hooks/firebase'
import { useUser } from '../hooks/user'
import { ROOT, SIGN_IN } from './routes'

interface WithAuthOptions {
  adminOnly?: boolean
}

export function withAuth<T>(
  WrappedComponent: React.ComponentType<T>,
  options?: WithAuthOptions
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithAuth = (props: T) => {
    const { fetching, isAdmin } = useUser()
    const { logout, token } = useFirebase()
    const router = useRouter()

    React.useEffect(() => {
      if (!token) {
        router.replace(`${SIGN_IN}?next=${router.pathname}`)
        logout()
      }
    }, [logout, router, token])

    React.useEffect(() => {
      if (options?.adminOnly && !fetching && !isAdmin) {
        router.replace(ROOT)
      }
    }, [fetching, isAdmin, logout, router])

    return token ? <WrappedComponent {...props} /> : null
  }

  ComponentWithAuth.displayName = `withAuth(${displayName})`

  return ComponentWithAuth
}

import { useRouter } from 'next/router'
import React from 'react'

import { useFirebase } from '../../hooks/firebase'
import { SIGN_IN } from '../../utils/routes'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithAuth = (props: T) => {
    const { logout, token } = useFirebase()
    const router = useRouter()

    React.useEffect(() => {
      if (!token) {
        router.replace(SIGN_IN)
        logout()
      }
    }, [token, router, logout])

    return token ? <WrappedComponent {...props} /> : null
  }

  ComponentWithAuth.displayName = `withAuth(${displayName})`

  return ComponentWithAuth
}

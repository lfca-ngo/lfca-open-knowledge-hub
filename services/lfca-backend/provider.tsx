import { authExchange } from '@urql/exchange-auth'
import { cacheExchange } from '@urql/exchange-graphcache'
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  // debugExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from 'urql'

import { SIGN_IN } from '../../utils/routes'
import { firebaseAuth } from '../firebase'
import schema from './schema.json'

interface LFCABackendProviderProps {
  children: React.ReactNode
}

class Deferred {
  promise: Promise<null>
  // eslint-disable-next-line no-unused-vars
  resolve: ((v: null) => void) | undefined
  reject: (() => void) | undefined
  constructor() {
    this.promise = new Promise<null>((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}

export const LFCABackendProvider = ({ children }: LFCABackendProviderProps) => {
  const router = useRouter()
  const [user, loading] = useAuthState(firebaseAuth)

  const routerRef = React.useRef<NextRouter>(router)
  const waitUntilFirebaseReady = React.useRef(new Deferred())

  routerRef.current = router

  React.useEffect(() => {
    async function start() {
      waitUntilFirebaseReady.current.resolve?.(null)
    }

    // Wait for everything to be setup before starting
    if (!loading) {
      start()
    }
  }, [loading])

  const client = React.useMemo(() => {
    return createClient({
      exchanges: [
        dedupExchange,
        // debugExchange,
        cacheExchange({ schema: schema as IntrospectionData }),
        authExchange<{ token?: string }>({
          addAuthToOperation: ({ authState, operation }) => {
            // the token isn't in the auth state, return the operation without changes
            if (!authState?.token) {
              return operation
            }
            // Get already existing fetchOptions
            const fetchOptions =
              typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {}

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.token}`,
                },
              },
            })
          },
          didAuthError: ({ error }) => {
            // check if the error was an auth error
            const isAuthError = error.graphQLErrors.some(
              (e) => e.extensions?.code === 'UNAUTHENTICATED'
            )
            return isAuthError
          },
          getAuth: async ({ authState }) => {
            // Get an initial token from firebase
            if (!authState?.token) {
              await waitUntilFirebaseReady.current.promise
              const initialToken = await user?.getIdToken()
              if (initialToken) {
                return { token: initialToken }
              }
              return {
                token: 'failed',
              }
            }

            /**
             * the following code gets executed when an auth error has occurred
             * we should refresh the token if possible and return a new auth state
             **/
            const refreshedToken = await user?.getIdToken(true)

            if (refreshedToken) {
              return {
                token: refreshedToken,
              }
            }

            routerRef.current.replace(SIGN_IN)
            return null
          },
        }),
        fetchExchange,
      ],
      requestPolicy: 'cache-first',
      url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
    })
  }, [user])

  return <Provider value={client}>{children}</Provider>
}

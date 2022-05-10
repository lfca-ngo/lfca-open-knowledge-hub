import { authExchange } from '@urql/exchange-auth'
import { offlineExchange } from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  createClient,
  // debugExchange,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from 'urql'

import { isBrowser } from '../../utils'
import { SIGN_IN } from '../../utils/routes'
import { firebaseAuth } from '../firebase'
import schema from './schema.json'

interface LFCABackendProviderProps {
  children: React.ReactNode
}

class Deferred {
  promise: Promise<null>
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
  const waitUntilFirebaseReady = React.useRef(new Deferred())

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
        // `indexDB` (which is used by the offlineCache) is not available under NodeJS during build time
        ...(!isBrowser()
          ? []
          : [
              offlineExchange({
                schema: schema as IntrospectionData,
                storage: makeDefaultStorage({
                  idbName: 'graphcache-v3',
                  maxAge: 1,
                }),
              }),
            ]),
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

            router.replace(SIGN_IN)
            return null
          },
        }),
        fetchExchange,
      ],
      requestPolicy: 'cache-and-network',
      url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
    })
  }, [router, user])

  return <Provider value={client}>{children}</Provider>
}

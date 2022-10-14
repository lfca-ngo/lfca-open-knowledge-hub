import { authExchange } from '@urql/exchange-auth'
import { cacheExchange } from '@urql/exchange-graphcache'
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'
import React from 'react'
import {
  // debugExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from 'urql'

import { useFirebase } from '../../hooks/firebase'
import { companyAction } from './cache-resolvers'
import {
  addEventParticipant,
  completeCompanyAction,
  completeUserAction,
  createActionComment,
  createEvent,
  deleteActionComment,
  deleteServiceProviderReview,
  planCompanyAction,
  removeEventParticipant,
  updateEventParticipantStatus,
} from './cache-updates'
import schema from './schema.json'

interface LFCABackendProviderProps {
  children: React.ReactNode
}

export const LFCABackendProvider = ({ children }: LFCABackendProviderProps) => {
  const firebase = useFirebase()

  // We use a ref to keep the GQL client (especially the cache) immutable accross renders
  const firebaseRef = React.useRef<typeof firebase>(firebase)

  firebaseRef.current = firebase

  const client = React.useMemo(() => {
    return createClient({
      exchanges: [
        dedupExchange,
        // debugExchange,
        cacheExchange({
          keys: {
            CompaniesResult: (data) => data.cursor as string,
            CompanyAboutSection: (data) => `${data.heading}_${data.imageUrl}`,
            CompanyAchievement: (data) => data.contentId as string,
            CompanyProgram: (data) => data.contentId as string,
            CompanyTag: (data) => data.name as string,
            File: (data) => data.url as string,
            ServiceProviderReviewsResult: (data) => data.cursor as string,
            UsersResult: (data) => data.cursor as string,
          },
          resolvers: {
            Query: {
              companyAction,
            },
          },
          schema: schema as IntrospectionData,
          updates: {
            Mutation: {
              addEventParticipant: addEventParticipant,
              completeCompanyAction,
              completeUserAction,
              createActionComment,
              createEvent,
              deleteActionComment,
              deleteServiceProviderReview,
              planCompanyAction,
              removeEventParticipant,
              updateEventParticipantStatus,
            },
          },
        }),
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
              return {
                token: firebaseRef.current.token || 'failed',
              }
            }

            /**
             * the following code gets executed when an auth error has occurred
             * we should refresh the token if possible and return a new auth state
             **/
            const refreshedToken = await firebaseRef.current?.refreshToken()

            if (refreshedToken) {
              return {
                token: refreshedToken,
              }
            }

            // Force logout since the user seems not to be authenticated
            await firebaseRef.current.logout()
            return null
          },
        }),
        fetchExchange,
      ],
      fetchOptions: {
        headers: {
          'x-graphql-client-name': 'lfca-community-app',
          'x-graphql-client-version':
            process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
        },
      },
      requestPolicy: 'cache-first',
      url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
    })
  }, [])

  return <Provider value={client}>{children}</Provider>
}

import { createClient, dedupExchange, fetchExchange } from 'urql'

export const ssrClient = createClient({
  exchanges: [dedupExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.LFCA_BACKED_ADMIN_TOKEN}`,
      'x-graphql-client-name': 'lfca-community-app',
      'x-graphql-client-version':
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
    },
  },
  url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
})

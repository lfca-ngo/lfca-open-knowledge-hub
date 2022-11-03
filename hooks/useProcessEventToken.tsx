import { Skeleton } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import React from 'react'
import { OperationContext } from 'urql'

import {
  Exact,
  ProcessEventRsvpTokenInput,
  useProcessEventRsvpTokenMutation,
} from '../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../utils'

export const useProcessEventToken = (
  processEventRSVPToken: (
    variables: Exact<{
      input: ProcessEventRsvpTokenInput
    }>,
    context?: Partial<OperationContext> | undefined
  ) => void,
  token?: string | string[]
) => {
  useEffect(() => {
    if (typeof token === 'string') {
      processEventRSVPToken({
        input: {
          token,
        },
      })
    }
  }, [processEventRSVPToken, token])
}

/**
 * HOC component that process event token
 * renders errors and passes the event data
 * down to the child component
 */

export function withEventToken<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithEventToken = (props: T) => {
    const { isReady, query } = useRouter()
    const { token } = query

    const [{ data, error, fetching }, processEventRSVPToken] =
      useProcessEventRsvpTokenMutation()

    useProcessEventToken(processEventRSVPToken, token)

    if (fetching || !isReady)
      return (
        <Skeleton
          active
          loading={fetching}
          paragraph={{
            rows: 2,
            width: '100%',
          }}
          title={{
            width: '100%',
          }}
        />
      )

    if (error)
      return (
        <>
          <h1>Something went wrong...</h1>
          <p>
            Please try again. If the problem persists, please contact us via{' '}
            <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
              {DEFAULT_SUPPORT_EMAIL}
            </a>
            .
          </p>
        </>
      )

    return (
      <WrappedComponent
        {...props}
        event={data?.processEventRSVPToken}
        token={token}
      />
    )
  }

  ComponentWithEventToken.displayName = `withEventToken(${displayName})`

  return ComponentWithEventToken
}

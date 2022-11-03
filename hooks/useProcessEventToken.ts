import { useEffect } from 'react'
import { OperationContext } from 'urql'

import { Exact, ProcessEventRsvpTokenInput } from '../services/lfca-backend'

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

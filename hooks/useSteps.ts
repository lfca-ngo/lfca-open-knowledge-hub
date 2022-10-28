import { useState } from 'react'

import { trackEvent } from '../services/analytics'

export const useSteps = (stepsLength: number, onComplete: () => void) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => {
    if (currentStepIndex === stepsLength - 1) {
      trackEvent({ name: 'completeSteps' })
      onComplete()
    } else {
      trackEvent({ name: 'nextStep', values: { step: currentStepIndex } })
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const prev = () => {
    if (currentStepIndex > 0) {
      trackEvent({ name: 'prevStep', values: { step: currentStepIndex } })
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i - 1)
    }
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < stepsLength) {
      trackEvent({
        name: 'goTo',
        values: { goTo: index, step: currentStepIndex },
      })
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex(index)
    }
  }

  return {
    currentStepIndex,
    goTo,
    next,
    prev,
  }
}

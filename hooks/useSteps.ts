import { useState } from 'react'

export const useSteps = (stepsLength: number, onComplete: () => void) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => {
    if (currentStepIndex === stepsLength - 1) {
      onComplete()
    } else {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const prev = () => {
    if (currentStepIndex > 0) {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < stepsLength) {
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

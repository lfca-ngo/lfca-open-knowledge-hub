import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { OnboardingSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
// import { withAuth } from '../utils/with-auth'

const Onboarding: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const handleOnNext = () => {
    if (currentStepIndex === OnboardingSteps.length - 1) {
      router.push('/')
    } else {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const Step = OnboardingSteps[currentStepIndex]?.component

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingSteps}
    >
      {Step ? <Step onNext={handleOnNext} /> : null}
    </StepsLayout>
  )
}

export default Onboarding

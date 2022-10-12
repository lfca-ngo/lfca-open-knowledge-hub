import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { CompanyInfo, CompanyInfoSide } from '../components/Flows/Onboarding'
import { StepsLayout } from '../components/Layout'
// import { withAuth } from '../utils/with-auth'

const Onboarding: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: CompanyInfo,
      sideComponent: CompanyInfoSide,
      title: 'Company Info',
    },
    {
      component: CompanyInfo,
      title: 'Personal Info',
    },
  ]

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
  const SideComponent = OnboardingSteps[currentStepIndex]?.sideComponent

  return (
    <StepsLayout
      asideChildren={SideComponent ? <SideComponent /> : null}
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingSteps.map((s) => ({ title: s.title }))}
    >
      {Step ? <Step onNext={handleOnNext} /> : null}
    </StepsLayout>
  )
}

export default Onboarding

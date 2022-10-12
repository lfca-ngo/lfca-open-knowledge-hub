import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import {
  CompanyInfo,
  CompanyInfoSide,
  PersonalInfo,
  PersonalInfoSide,
} from '../components/Flows/Onboarding'
import iPadImage from '../components/Flows/Onboarding/bg-image.png'
import { StepsLayout } from '../components/Layout'

const Onboarding: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: CompanyInfo,
      sideComponent: CompanyInfoSide,
      sideComponentBackgroundImage: iPadImage,
      title: 'Company Info',
    },
    {
      component: PersonalInfo,
      sideComponent: PersonalInfoSide,
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
  const BackgroundImage =
    OnboardingSteps[currentStepIndex]?.sideComponentBackgroundImage

  return (
    <StepsLayout
      asideChildren={SideComponent ? <SideComponent /> : null}
      backgroundImage={BackgroundImage}
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

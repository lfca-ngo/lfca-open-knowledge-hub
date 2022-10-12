import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import {
  CompanyInfo,
  CompanyInfoSide,
  Groups,
  GroupsSide,
  Invite,
  InviteSide,
  Membership,
  MembershipSide,
  PersonalInfo,
  PersonalInfoSide,
  Personalize,
  PersonalizeSide,
} from '../components/Flows/Onboarding'
import CommunityFacesImage from '../components/Flows/Onboarding/community-faces.png'
import CoursePreviewImage from '../components/Flows/Onboarding/course-preview.png'
import PlatformPreviewImage from '../components/Flows/Onboarding/platform-preview.png'
import { StepsLayout } from '../components/Layout'

const Onboarding: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: CompanyInfo,
      sideComponent: CompanyInfoSide,
      sideComponentBackgroundImage: PlatformPreviewImage,
      title: 'Company Info',
    },
    {
      component: PersonalInfo,
      sideComponent: PersonalInfoSide,
      sideComponentBackgroundImage: CommunityFacesImage,
      title: 'Personal Info',
    },
    {
      component: Groups,
      sideComponent: GroupsSide,
      sideComponentBackgroundImage: CoursePreviewImage,
      title: 'Groups',
    },
    {
      component: Personalize,
      sideComponent: PersonalizeSide,
      title: 'Personalize',
    },
    {
      component: Invite,
      sideComponent: InviteSide,
      title: 'Invite',
    },
    {
      component: Membership,
      sideComponent: MembershipSide,
      title: 'Membership',
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

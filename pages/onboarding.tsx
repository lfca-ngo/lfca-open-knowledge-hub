import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

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
import { useSteps } from '../hooks/useSteps'

const Onboarding: NextPage = () => {
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: Membership,
      sideComponent: MembershipSide,
      title: 'Membership',
    },
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
  ]

  const [sharedState, setSharedState] = useState({})
  const { currentStepIndex, next, prev } = useSteps(
    OnboardingSteps.length,
    () => router.push('/')
  )

  const Step = OnboardingSteps[currentStepIndex]?.component
  const SideComponent = OnboardingSteps[currentStepIndex]?.sideComponent
  const BackgroundImage =
    OnboardingSteps[currentStepIndex]?.sideComponentBackgroundImage

  return (
    <StepsLayout
      asideChildren={
        SideComponent ? (
          <SideComponent
            sharedState={sharedState}
            setSharedState={setSharedState}
          />
        ) : null
      }
      backgroundImage={BackgroundImage}
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingSteps.map((s) => ({ title: s.title }))}
    >
      {Step ? (
        <Step
          onNext={next}
          onPrev={prev}
          sharedState={sharedState}
          setSharedState={setSharedState}
        />
      ) : null}
    </StepsLayout>
  )
}

export default Onboarding

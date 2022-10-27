import type { GetStaticProps, NextPage } from 'next'
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
  Share,
  ShareSide,
} from '../components/Flows/Onboarding'
import CommunityFacesImage from '../components/Flows/Onboarding/images/community-faces.png'
import CoursePreviewImage from '../components/Flows/Onboarding/images/course-preview.png'
import PlatformPreviewImage from '../components/Flows/Onboarding/images/platform-preview.png'
import { StepsLayout } from '../components/Layout'
import { useSteps } from '../hooks/useSteps'
import { ContentfulActionFields, fetchAllActions } from '../services/contentful'

const DEFAULT_SUBSCRIPTION_TYPE = 'PREMIUM'

interface OnboardingProps {
  actionsContent: Record<string, ContentfulActionFields>
}

const Onboarding: NextPage<OnboardingProps> = ({ actionsContent }) => {
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: Personalize,
      sideComponent: PersonalizeSide,
      title: 'Personalize',
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
      component: Invite,
      sideComponent: InviteSide,
      title: 'Invite',
    },
    {
      component: Membership,
      sideComponent: MembershipSide,
      title: 'Membership',
    },
    {
      component: Share,
      sideComponent: ShareSide,
      title: 'Share',
    },
  ]

  const [sharedState, setSharedState] = useState({
    selectedSubscriptionType: DEFAULT_SUBSCRIPTION_TYPE,
  })
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
            setSharedState={setSharedState}
            sharedState={sharedState}
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
          actionsContent={actionsContent}
          onNext={next}
          onPrev={prev}
          setSharedState={setSharedState}
          sharedState={sharedState}
        />
      ) : null}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps<OnboardingProps> = async () => {
  const actionsById = await fetchAllActions()

  return {
    props: {
      actionsContent: actionsById,
    },
  }
}

export default Onboarding

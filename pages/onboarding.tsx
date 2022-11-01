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
  Slack,
  SlackSide,
} from '../components/Flows/Onboarding'
import CommunityFacesImage from '../components/Flows/Onboarding/images/community-faces.png'
import CoursePreviewImage from '../components/Flows/Onboarding/images/course-preview.png'
import PlatformPreviewImage from '../components/Flows/Onboarding/images/platform-preview.png'
import SlackImage from '../components/Flows/Onboarding/images/slack.png'
import { StepsLayout } from '../components/Layout'
import { useSteps } from '../hooks/useSteps'
import {
  ContentfulActionFields,
  ContentfulContentCollectionFields,
  fetchAllActions,
  fetchContentCollectionById,
} from '../services/contentful'

const DEFAULT_SUBSCRIPTION_TYPE = 'PREMIUM'

interface OnboardingProps {
  actionsContent: Record<string, ContentfulActionFields>
  membershipFaq: ContentfulContentCollectionFields
}

const Onboarding: NextPage<OnboardingProps> = ({
  actionsContent,
  membershipFaq,
}) => {
  const router = useRouter()

  const OnboardingSteps = [
    {
      component: CompanyInfo,
      sideComponent: CompanyInfoSide,
      sideComponentBackgroundImage: PlatformPreviewImage,
      title: 'Company',
    },
    {
      component: PersonalInfo,
      sideComponent: PersonalInfoSide,
      sideComponentBackgroundImage: CommunityFacesImage,
      title: 'Account',
    },
    {
      component: Groups,
      sideComponent: GroupsSide,
      sideComponentBackgroundImage: CoursePreviewImage,
      title: 'Groups',
    },
    {
      component: Slack,
      sideComponent: SlackSide,
      sideComponentBackgroundImage: SlackImage,
      title: 'Slack',
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

  const StepItem = OnboardingSteps[currentStepIndex]
  const Step = StepItem?.component
  const SideComponent = StepItem?.sideComponent
  const BackgroundImage = StepItem?.sideComponentBackgroundImage

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
      hideLastItem
      onClose={() => router.push('/')}
      steps={OnboardingSteps.map((s) => ({ title: s.title }))}
    >
      {Step ? (
        <Step
          actionsContent={actionsContent}
          membershipFaq={membershipFaq}
          onNext={next}
          onPrev={prev}
          setSharedState={setSharedState}
          sharedState={sharedState}
          title={StepItem?.title}
        />
      ) : null}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps<OnboardingProps> = async () => {
  const actionsById = await fetchAllActions()
  const membershipFaq = await fetchContentCollectionById('membership')

  return {
    props: {
      actionsContent: actionsById,
      membershipFaq,
    },
  }
}

export default Onboarding

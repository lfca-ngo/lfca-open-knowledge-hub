import { message } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { FloatingHelp } from '../components/FloatingHelp'
import {
  CompanyInfo,
  CompanyInfoFormProps,
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
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useUser } from '../hooks/user'
import { useSteps } from '../hooks/useSteps'
import {
  ContentfulActionFields,
  ContentfulContentCollectionFields,
  Country,
  fetchAllActions,
  fetchAllCountries,
  fetchContentCollectionById,
} from '../services/contentful'
import {
  CompanySubscriptionType,
  EventParticipantStatus,
  RegisterUserInput,
} from '../services/lfca-backend'

const DEFAULT_SUBSCRIPTION_TYPE = 'PREMIUM'

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
    component: Slack,
    sideComponent: SlackSide,
    sideComponentBackgroundImage: SlackImage,
    title: 'Slack',
  },
  {
    component: Share,
    sideComponent: ShareSide,
    title: 'Share',
  },
]

interface OnboardingProps {
  actionsContent: Record<string, ContentfulActionFields>
  countries: Country[]
  membershipFaq: ContentfulContentCollectionFields
}

export interface OnboardingSharedStateProps {
  selectedSubscriptionType?: CompanySubscriptionType
  company?: CompanyInfoFormProps
  personal?: RegisterUserInput
}

const Onboarding: NextPage<OnboardingProps> = ({
  actionsContent,
  countries,
  membershipFaq,
}) => {
  const { user } = useUser()
  const { push, query } = useRouter()
  const { country } = query

  const [sharedState, setSharedState] = useLocalStorage('onboarding_state', {
    selectedSubscriptionType: DEFAULT_SUBSCRIPTION_TYPE,
  })

  const { currentStepIndex, goTo, next, prev } = useSteps(
    OnboardingSteps.length,
    () => push('/')
  )

  useEffect(() => {
    if (currentStepIndex === 0 && user) {
      // when user is already logged in and flow
      // is just starting (e.g. after verifying
      // their email), skip registration steps
      message.info('Already logged in. Skipping registration')
      goTo(2)
    }
  }, [goTo, user, currentStepIndex])

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
      onClose={() => push('/')}
      steps={OnboardingSteps.map((s) => ({ title: s.title }))}
    >
      {Step ? (
        <Step
          actionsContent={actionsContent}
          countries={countries}
          country={country}
          membershipFaq={membershipFaq}
          onNext={next}
          onPrev={prev}
          setSharedState={setSharedState}
          sharedState={sharedState}
          statusOnJoinGroup={EventParticipantStatus.USER_RSVP_ACCEPTED}
          title={StepItem?.title}
        />
      ) : null}

      {/* Show a floating help */}
      <FloatingHelp />
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps<OnboardingProps> = async () => {
  const actionsById = await fetchAllActions()
  const membershipFaq = await fetchContentCollectionById('membership')
  const countries = await fetchAllCountries()

  return {
    props: {
      actionsContent: actionsById,
      countries,
      membershipFaq,
    },
  }
}

export default Onboarding

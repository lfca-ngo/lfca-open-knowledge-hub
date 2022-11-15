import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import {
  Intro,
  Personalize,
  Slack,
  Start,
} from '../components/Flows/OnboardingOfficer'
import { StepsLayout } from '../components/Layout'
import { useSteps } from '../hooks/useSteps'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../services/lfca-backend'
import { withAuth } from '../utils-server-only'

const OnboardingOfficer: NextPage = () => {
  const router = useRouter()

  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  const OnboardingOfficerSteps = [
    {
      component: Intro,
      description: 'Get to know the platform',
      title: 'Intro',
    },
    {
      component: Personalize,
      description: 'What’s your status quo',
      title: 'Personalize',
    },
    {
      component: Slack,
      description: 'Slack',
      title: 'Connect to Slack',
    },
    {
      component: Start,
      description: 'Get started',
      title: 'Let’s go!',
    },
  ]

  const { currentStepIndex, next } = useSteps(
    OnboardingOfficerSteps.length,
    () => router.push('/')
  )

  const Step = OnboardingOfficerSteps[currentStepIndex]?.component

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingOfficerSteps}
    >
      {Step ? (
        <Step
          actions={data?.companyActions || EMPTY_ACTIONS}
          fetching={fetchingActions}
          onNext={next}
        />
      ) : null}
    </StepsLayout>
  )
}

export default withAuth(OnboardingOfficer)

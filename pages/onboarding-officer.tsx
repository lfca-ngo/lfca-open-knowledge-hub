import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import {
  Intro,
  Personalize,
  Slack,
  Start,
} from '../components/Flows/OnboardingOfficer'
import { StepsLayout } from '../components/Layout'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../services/lfca-backend'
import { withAuth } from '../utils/with-auth'

const OnboardingOfficer: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
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

  const handleOnNext = () => {
    if (currentStepIndex === OnboardingOfficerSteps.length - 1) {
      router.push('/')
    } else {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

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
          onNext={handleOnNext}
        />
      ) : null}
    </StepsLayout>
  )
}

export default withAuth(OnboardingOfficer)

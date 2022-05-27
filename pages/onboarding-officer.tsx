import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { OnboardingOfficerSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { EMPTY_ACTIONS_ARRAY } from '../services/contentful/utils'
import {
  sortCompanyActionsByTag,
  useCompanyActionsListQuery,
} from '../services/lfca-backend'
import { withAuth } from '../utils/with-auth'

const OnboardingOfficer: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  // TODO: loading & error UI
  const [{ data }] = useCompanyActionsListQuery()

  const actionsByTags = React.useMemo(
    () => sortCompanyActionsByTag(data?.companyActions || EMPTY_ACTIONS_ARRAY),
    [data]
  )

  const handleOnNext = () => {
    if (currentStepIndex === OnboardingOfficerSteps.length - 1) {
      router.push('/')
    } else {
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
        <Step actionsByTags={actionsByTags} onNext={handleOnNext} />
      ) : null}
    </StepsLayout>
  )
}

export default withAuth(OnboardingOfficer)

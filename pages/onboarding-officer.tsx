import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { OnboardingOfficerSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import {
  EMPTY_ACTIONS_ARRAY,
  sortCompanyActionsByCategories,
  useCompanyActionsListQuery,
} from '../services/lfca-backend'
import { withAuth } from '../utils/with-auth'

const OnboardingOfficer: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  // TODO: loading & error UI
  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  const actionsByCategories = React.useMemo(
    () =>
      sortCompanyActionsByCategories(
        data?.companyActions || EMPTY_ACTIONS_ARRAY,
        false // do not filter the completed actions out
      ),
    [data]
  )

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
          actionsByCategories={actionsByCategories}
          fetching={fetchingActions}
          onNext={handleOnNext}
        />
      ) : null}
    </StepsLayout>
  )
}

export default withAuth(OnboardingOfficer)

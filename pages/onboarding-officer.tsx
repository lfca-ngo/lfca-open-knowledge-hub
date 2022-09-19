import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { OnboardingOfficerSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { fetchRootCategoryTrees } from '../services/contentful'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../services/lfca-backend'
import { withAuth } from '../utils/with-auth'

const OnboardingOfficer: NextPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  // TODO: loading & error UI
  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

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

export const getStaticProps: GetStaticProps = async () => {
  const categoryTrees = await fetchRootCategoryTrees()

  return {
    props: {
      categoryTrees,
    },
  }
}

export default withAuth(OnboardingOfficer)

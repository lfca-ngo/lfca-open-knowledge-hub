import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'

import { OnboardingOfficerSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import {
  ContentfulServiceProviderFields,
  fetchAllServiceProviders,
} from '../services/contentful'
import { EMPTY_ACTIONS_ARRAY } from '../services/contentful/utils'
import {
  sortCompanyActionsByTag,
  useCompanyActionsQuery,
} from '../services/lfca-backend'

const OnboardingOfficer: NextPage = ({
  serviceProviders,
}: {
  serviceProviders?: ContentfulServiceProviderFields[]
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  // TODO: loading & error UI
  const [{ data }] = useCompanyActionsQuery()

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

  console.log(actionsByTags)

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={OnboardingOfficerSteps}
    >
      {Step ? (
        <Step
          actionsByTags={actionsByTags}
          onNext={handleOnNext}
          serviceProviders={serviceProviders}
        />
      ) : null}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const serviceProviders = await fetchAllServiceProviders()

  return {
    props: {
      serviceProviders,
    },
  }
}

export default OnboardingOfficer

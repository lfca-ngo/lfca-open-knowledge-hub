import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { cloneElement, useState } from 'react'

import { OnboardingLeaderSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { fetchAllQuestionnaires } from '../services/contentful'

const OnboardingLeader: NextPage = (props: any) => {
  const router = useRouter()
  const [currentStep, setStep] = useState(0)
  const steps = OnboardingLeaderSteps({ setStep })
  const currentView = steps[currentStep].component

  return (
    <StepsLayout
      canClose
      currentStep={currentStep}
      onClose={() => router.push('/')}
      setStep={setStep}
      steps={steps}
    >
      {cloneElement(currentView, {
        questionnaire: props?.questionnaires['oc-AU'],
      })}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const questionnaires = await fetchAllQuestionnaires()

  return {
    props: {
      questionnaires,
    },
  }
}

export default OnboardingLeader

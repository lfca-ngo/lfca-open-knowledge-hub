import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Compare, Footprint, Share } from '../components/Flows/RenewalLeader'
import { StepsLayout } from '../components/Layout'
import { useUser } from '../hooks/user'
import { fetchAllQuestionnaires } from '../services/contentful'
import { DEFAULT_COUNTRY } from '../utils'
import { withAuth } from '../utils/with-auth'

const OnboardingLeader: NextPage = (props: any) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()
  const { user } = useUser()

  const RenewalLeaderSteps = [
    {
      component: Footprint,
      description: 'Understand your emissions',
      title: 'Footprint',
    },
    {
      component: Compare,
      description: 'Compare to last year',
      title: 'Compare',
    },
    {
      component: Share,
      description: 'Use your influence',
      title: 'Share the news',
    },
  ]

  const handleOnNext = () => {
    if (currentStepIndex === RenewalLeaderSteps.length - 1) {
      router.push('/')
    } else {
      // always scroll to top
      window?.scrollTo(0, 0)
      setCurrentStepIndex((i) => i + 1)
    }
  }

  const Step = RenewalLeaderSteps[currentStepIndex]?.component
  const userCountry = user?.country || DEFAULT_COUNTRY
  const defaultQuestionnaire = props?.questionnaires[DEFAULT_COUNTRY]

  return (
    <StepsLayout
      canClose
      currentStepIndex={currentStepIndex}
      onClose={() => router.push('/')}
      steps={RenewalLeaderSteps}
    >
      {Step ? (
        <Step
          onNext={handleOnNext}
          questionnaire={
            props?.questionnaires[userCountry] || defaultQuestionnaire
          }
        />
      ) : null}
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

export default withAuth(OnboardingLeader)

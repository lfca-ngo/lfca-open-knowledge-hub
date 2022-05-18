import { Divider } from 'antd'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { Section } from '../Layout'
import { ReviewForm } from '../ReviewForm'
import { ShareLearningsForm } from './ShareLearningsForm'

export const CompleteActionForm = ({
  onComplete,
  serviceProviders,
  withReviewForm = false,
}: {
  onComplete: () => void
  serviceProviders?: ContentfulServiceProviderFields[]
  withReviewForm?: boolean
}) => {
  return (
    <Section title="Share your learnings">
      {withReviewForm && (
        <>
          <ReviewForm serviceProviders={serviceProviders || []} />
          <Divider />
        </>
      )}
      <ShareLearningsForm onComplete={onComplete} />
    </Section>
  )
}

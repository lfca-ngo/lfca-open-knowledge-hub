import { Divider } from 'antd'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { Section } from '../Layout'
import { ReviewForm } from '../ReviewForm'
import { ShareLearningsForm } from './ShareLearningsForm'

interface CompleteActionFormProps {
  actionContentId: string
  onComplete: () => void
  serviceProviders?: ContentfulServiceProviderFields[]
  withReviewForm?: boolean
}

export const CompleteActionForm = ({
  actionContentId,
  onComplete,
  serviceProviders,
  withReviewForm = false,
}: CompleteActionFormProps) => {
  return (
    <Section title="Share your learnings">
      {withReviewForm && (
        <>
          <ReviewForm serviceProviders={serviceProviders || []} />
          <Divider />
        </>
      )}
      <ShareLearningsForm
        actionContentId={actionContentId}
        onComplete={onComplete}
      />
    </Section>
  )
}

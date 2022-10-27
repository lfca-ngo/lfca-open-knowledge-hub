import { Divider, notification } from 'antd'

import {
  useCompleteCompanyActionMutation,
  useCreateActionCommentMutation,
} from '../../services/lfca-backend'
import { CommentForm } from '../Comments/CommentForm'
import { File } from '../FileUpload/FileUpload'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'
import { Section } from '../Layout'
import { ReviewForm } from '../ReviewForm'

interface CompleteActionFormProps {
  actionContentId: string
  onComplete: () => void
  withReviewForm?: boolean
}

const openNotification = () => {
  notification.info({
    description: `The more you share, the more you'll get out of the community.`,
    icon: <IconSelector color="wine" type={IconTypes.heart} />,
    message: `Awesome, Thanks for sharing!`,
    placement: 'top',
  })
}

export const CompleteActionForm = ({
  actionContentId,
  onComplete,
  withReviewForm = false,
}: CompleteActionFormProps) => {
  // TODO: UI for error states
  const [{ fetching: fetchingCompleteAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const [{ fetching: fetchingCreateActionComment }, createActionComment] =
    useCreateActionCommentMutation()

  const handleComplete = async ({
    attachments,
    message,
    notes,
  }: {
    attachments?: File[]
    message: string
    notes?: string
  }) => {
    if (message || attachments?.length) {
      await createActionComment({
        input: {
          actionContentId,
          attachments: attachments?.map((a) => ({
            fileName: a.fileName,
            fileSize: a.fileSize,
            mimeType: a.mimeType,
            source: a.source,
          })),
          message: message,
        },
      })
    }

    await completeCompanyAction({
      input: {
        actionContentId,
        isCompleted: true,
        notes: notes,
      },
    })
    openNotification()
    onComplete()
  }

  return (
    <Section>
      <h2>Mark action as done</h2>
      <Divider />

      {withReviewForm && (
        <>
          <ReviewForm actionContentId={actionContentId} />
          <Divider />
        </>
      )}
      <CommentForm
        ctaText="Mark action as done"
        loading={fetchingCompleteAction || fetchingCreateActionComment}
        onSubmit={handleComplete}
        showNotes
      />
    </Section>
  )
}

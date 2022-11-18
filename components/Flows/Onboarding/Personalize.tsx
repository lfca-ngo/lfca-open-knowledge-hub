import { Button, Drawer, Modal, Space, Tag } from 'antd'
import { useState } from 'react'

import { ONBOARDING_STEPS, useAnalytics } from '../../../hooks/segment'
import { ContentfulActionFields } from '../../../services/contentful'
import {
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../../../services/lfca-backend'
import { actionHasReviews } from '../../../utils'
import { withAuth } from '../../../utils-server-only'
import { ActionPillars } from '../../ActionPillars'
import { ActionPreview } from '../../ActionPreview'
import { ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { DefaultStepProps } from './..'

export const PersonalizeContent = ({
  actionsContent,
  onNext,
  onPrev,
  title,
}: DefaultStepProps & {
  actionsContent?: Record<string, ContentfulActionFields>
}) => {
  const analytics = useAnalytics()
  const [previewActionId, setPreviewActionId] = useState<string | undefined>()
  const [activeActionIndex, setActiveActionIndex] = useState<number>(-1)
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  const goNext = () => {
    // completed form
    analytics.track(ONBOARDING_STEPS.COMPLETED_PERSONALIZATION_STEP)

    onNext?.()
  }

  // to preview action content, we need the contentful data
  const actionContent = previewActionId && actionsContent?.[previewActionId]
  const activeAction = data?.companyActions[activeActionIndex]

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Where are you on the journey? 🎯`}</h1>
      <div className="description">
        <p>
          {`To personalize your experience, we invite you to select the actions
          you are working on or have already completed. You can update this at a
          later stage.`}
        </p>
        <p>
          Tip: Make use of filters by action pillars (explanation on the right).
        </p>
      </div>

      <ActionsList
        actionListItemProps={{
          mode: 'compact',
          onCtaClick: (action) => {
            const actionIndex =
              data?.companyActions.findIndex(
                (a) => a.contentId === action.contentId
              ) || -1
            setActiveActionIndex(actionIndex)
            setSelectedActionContentId(action.contentId)
          },
          onToggleInfo(action, actionContentId) {
            const actionIndex =
              data?.companyActions.findIndex(
                (a) => a.contentId === action.contentId
              ) || -1
            setActiveActionIndex(actionIndex)
            setPreviewActionId(actionContentId)
          },
          selectText: 'Select',
          unselectText: 'Unselect',
        }}
        actions={data?.companyActions || EMPTY_ACTIONS}
        fetching={fetchingActions}
        mode="compact"
        pageSize={8}
      />

      <Space style={{ margin: '30px 0 0' }}>
        <Button onClick={goNext} size="large" type="primary">
          Continue
        </Button>
        <Button onClick={onPrev} size="large" type="link">
          Back
        </Button>
      </Space>

      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setPreviewActionId(undefined)}
        open={!!previewActionId}
        wrapClassName="modal-md"
      >
        {actionContent && activeAction ? (
          <ActionPreview action={activeAction} actionContent={actionContent} />
        ) : (
          'Missing data..'
        )}
      </Modal>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setSelectedActionContentId(null)}
        open={!!selectedActionContentId}
      >
        {selectedActionContentId ? (
          <CompleteActionForm
            actionContentId={selectedActionContentId}
            onComplete={() => setSelectedActionContentId(null)}
            withReviewForm={actionHasReviews(activeAction)}
          />
        ) : null}
      </Drawer>
    </div>
  )
}

export const Personalize = withAuth(PersonalizeContent)

export const PersonalizeSide = () => {
  return (
    <div>
      <ActionPillars />
    </div>
  )
}

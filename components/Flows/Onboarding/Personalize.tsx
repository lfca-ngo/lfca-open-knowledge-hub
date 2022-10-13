import { Button, Drawer, Space, Tag } from 'antd'
import { useState } from 'react'

import {
  CompanyActionListItemFragment,
  EMPTY_ACTIONS,
  useCompanyActionsListQuery,
} from '../../../services/lfca-backend'
import { actionHasReviews } from '../../../utils'
import { withAuth } from '../../../utils/with-auth'
import { ActionPillars } from '../../ActionPillars'
import { ActionsList } from '../../ActionsList'
import { CompleteActionForm } from '../../CompleteActionForm'
import { DefaultStepProps } from './..'

export const PersonalizeContent = ({ onNext }: DefaultStepProps) => {
  const [activeAction, setActiveAction] =
    useState<CompanyActionListItemFragment>()
  const [selectedActionContentId, setSelectedActionContentId] = useState<
    string | null
  >(null)

  const [{ data, fetching: fetchingActions }] = useCompanyActionsListQuery()

  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Where are you on your climate journey? 🎯`}</h1>
      <div className="description">
        <p>
          {`Let's start with a simple exercise: Did you already start taking
          climate action in your organization? Which actions have you taken and
          what have you learned?`}
        </p>
        <p>
          Tip: You can filter the available actions by stages. See our Action
          Pillars as a reference on the right.
        </p>
      </div>

      <ActionsList
        actionListItemProps={{
          mode: 'compact',
          onCtaClick: (action) => {
            setActiveAction(action)
            setSelectedActionContentId(action.contentId)
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
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
      </Space>

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

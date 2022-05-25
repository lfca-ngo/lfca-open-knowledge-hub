import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Divider, Drawer, message, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionDetails, ActionsBar } from '../../components/ActionDetails'
import { ActionHistory } from '../../components/ActionHistory'
import { AttachmentsList } from '../../components/AttachmentsList'
import { Comments } from '../../components/Comments'
import { CompleteActionForm } from '../../components/CompleteActionForm'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { LogoGroup } from '../../components/LogoGroup'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import {
  ContentfulActionFields,
  ContentfulServiceProviderFields,
  fetchAllActions,
  fetchAllServiceProviders,
} from '../../services/contentful'
import { EMPTY_ACTION } from '../../services/contentful/utils'
import {
  useActionCommentAttachmentsQuery,
  useCompanyActionDetailsQuery,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { renderTools } from '../../tools'
import { actionHasReviews } from '../../utils'
import { options } from '../../utils/richTextOptions'
import { withAuth } from '../../utils/with-auth'

const { TabPane } = Tabs

interface ActionProps {
  action: ContentfulActionFields
  serviceProviders?: ContentfulServiceProviderFields[]
}

const Action: NextPage<ActionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { action } = props
  const [{ data: actionData, fetching: fetchingActionData }] =
    useCompanyActionDetailsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })
  const [{ data: attachmentsData, fetching: fetchingAttachmentsData }] =
    useActionCommentAttachmentsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })

  const [{ fetching: fetchingPlanCompanyAction }, planCompanyAction] =
    usePlanCompanyActionMutation()
  const [{ fetching: fetchingCompleteCompanyAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const handleComplete = async () => {
    if (actionData?.companyAction.completedAt) {
      await completeCompanyAction({
        input: {
          actionContentId: action.actionId,
          isCompleted: false,
        },
      })
    } else {
      setIsOpen(true)
    }
  }

  const handlePlan = async () => {
    planCompanyAction({
      input: {
        actionContentId: action.actionId,
        isPlanned: !actionData?.companyAction.plannedAt,
      },
    }).then(({ data, error }) => {
      if (error) message.error(error.message)
      else {
        if (data?.planCompanyAction?.plannedAt) {
          message.success('Marked as planned')
        } else {
          message.info('Removed from planned actions')
        }
      }
    })
  }

  return (
    <SiderLayout goBack={() => router.back()}>
      <Main>
        <Section>
          <ActionDetails
            action={actionData?.companyAction || EMPTY_ACTION}
            fetching={fetchingActionData}
          />
        </Section>
        <Section>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab="Description">
              <ShowMore
                maxHeight={140}
                text={
                  action?.aboutText &&
                  documentToReactComponents(action?.aboutText, options)
                }
              />
            </TabPane>
            <TabPane key="2" tab="How To">
              <ShowMore
                maxHeight={140}
                text={<RequirementsList requirements={action?.requirements} />}
              />
            </TabPane>
            <TabPane key="3" tab="Examples">
              <ShowMore
                maxHeight={140}
                text={
                  action?.examples &&
                  documentToReactComponents(action?.examples, options)
                }
              />
            </TabPane>
            <TabPane key="4" tab="Benefits">
              <ShowMore
                maxHeight={140}
                text={
                  action?.benefits &&
                  documentToReactComponents(action?.benefits, options)
                }
              />
            </TabPane>
          </Tabs>
        </Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s) => s.position === 'main'),
          props,
          true
        )}
      </Main>

      <Sider>
        <Section title="Your progress">
          <ActionsBar
            fetchingCompleted={
              fetchingActionData || fetchingCompleteCompanyAction
            }
            fetchingPlanned={fetchingActionData || fetchingPlanCompanyAction}
            isCompleted={!!actionData?.companyAction.completedAt}
            isPlanned={!!actionData?.companyAction.plannedAt}
            onComplete={handleComplete}
            onPlan={handlePlan}
          />
        </Section>
        <Section title="Community">
          <LogoGroup
            data={actionData?.companyAction?.recentCompaniesCompleted}
            // TODO: Add a fallback or skeleton while data is loading
            label={`${actionData?.companyAction.companiesCompletedCount} members completed this`}
            reverse
            size="large"
          />
          <Divider orientation="left" orientationMargin="0">
            Latest Messages
          </Divider>
          <Comments actionContentId={action.actionId} />
        </Section>
        <Section title="Attachments">
          <AttachmentsList
            attachments={attachmentsData?.actionCommentAttachments || []}
            fetching={fetchingAttachmentsData}
          />
        </Section>
        <Section title="History">
          <ActionHistory actions={[]} />
        </Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s) => s.position === 'sider'),
          props
        )}
      </Sider>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setIsOpen(false)}
        visible={isOpen}
      >
        <CompleteActionForm
          actionContentId={action.actionId}
          onComplete={() => setIsOpen(false)}
          serviceProviders={props.serviceProviders}
          withReviewForm={actionHasReviews(action)}
        />
      </Drawer>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const actionId = params?.actionId as string
  const actionsById = await fetchAllActions()
  const action = actionsById[actionId]

  let serviceProviders = []
  if (actionHasReviews(action)) {
    serviceProviders = await fetchAllServiceProviders()
  }

  return {
    props: {
      action,
      serviceProviders,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const actionsById = await fetchAllActions()
  const paths = Object.keys(actionsById).map((actionId) => ({
    params: { actionId },
  }))
  return {
    fallback: false,
    paths: paths,
  }
}

export default withAuth(Action)

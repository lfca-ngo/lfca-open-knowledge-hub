import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Divider, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { ActionBar } from '../../components/ActionBar'
import { ActionDetails } from '../../components/ActionDetails'
import { ActionHistory } from '../../components/ActionHistory'
import { AttachmentsList } from '../../components/AttachmentsList'
import { Comments } from '../../components/Comments'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { LogoGroup } from '../../components/LogoGroup'
import { PayWall } from '../../components/PayWall'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'
import { EMPTY_ACTION } from '../../services/contentful/utils'
import {
  useActionCommentAttachmentsQuery,
  useCompanyActionDetailsQuery,
} from '../../services/lfca-backend'
import { renderTools } from '../../tools'
import { options } from '../../utils/richTextOptions'
import { withAuth } from '../../utils/with-auth'

const { TabPane } = Tabs

interface ActionProps {
  action: ContentfulActionFields
}

const Action: NextPage<ActionProps> = ({ action }) => {
  const router = useRouter()

  const [{ data: actionData, fetching: fetchingActionData }] =
    useCompanyActionDetailsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })
  const [{ data: attachmentsData, fetching: fetchingAttachmentsData }] =
    useActionCommentAttachmentsQuery({
      variables: { input: { actionContentId: action.actionId } },
    })

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
                text={
                  <RequirementsList
                    actionContentId={action.actionId}
                    requirements={actionData?.companyAction?.requirements}
                    requirementsContent={action?.requirements}
                  />
                }
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
          true
        )}
      </Main>

      <Sider>
        <Section title="Your progress">
          {actionData?.companyAction && (
            <ActionBar
              action={actionData?.companyAction}
              actionDetails={action}
            />
          )}
        </Section>
        <Section title="Community">
          <PayWall>
            <LogoGroup
              data={actionData?.companyAction?.recentCompaniesCompleted}
              label={`${actionData?.companyAction.companiesCompletedCount} members completed this`}
              reverse
              size="large"
            />
            <Divider orientation="left" orientationMargin="0">
              Latest Messages
            </Divider>
            <Comments actionContentId={action.actionId} />
          </PayWall>
        </Section>
        <Section title="Attachments">
          <AttachmentsList
            attachments={attachmentsData?.actionCommentAttachments || []}
            fetching={fetchingAttachmentsData}
          />
        </Section>
        <Section title="History">
          <ActionHistory contentId={actionData?.companyAction.contentId} />
        </Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s) => s.position === 'sider')
        )}
      </Sider>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps<ActionProps> = async ({
  params,
}) => {
  const actionId = params?.actionId as string
  const actionsById = await fetchAllActions()
  const action = actionsById[actionId]

  return {
    props: {
      action,
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

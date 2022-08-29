import {
  BulbOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Divider, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ActionBar } from '../../components/ActionBar'
import { ActionDetails } from '../../components/ActionDetails'
import { ActionHistory } from '../../components/ActionHistory'
import { AttachmentsList } from '../../components/AttachmentsList'
import { Comments } from '../../components/Comments'
import { EmptyState } from '../../components/EmptyState'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { LogoGroup } from '../../components/LogoGroup'
import { PayWall } from '../../components/PayWall'
import { RequirementsList } from '../../components/RequirementsList'
import { ShowMore } from '../../components/ShowMore'
import {
  ContentfulActionFields,
  fetchAllActions,
} from '../../services/contentful'
import {
  EMPTY_ACTION,
  useActionCommentAttachmentsQuery,
  useCompanyActionDetailsQuery,
  useCompanyActionExtendedDetailsQuery,
} from '../../services/lfca-backend'
import { ServiceProviderComparison } from '../../tools/ServiceProviderComparison'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import { options } from '../../utils/richTextOptions'
import { SETTINGS_SUBSCRIPTION } from '../../utils/routes'
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
  const [
    { data: actionDataExtended, fetching: fetchingAttachmentsDataExtended },
  ] = useCompanyActionExtendedDetailsQuery({
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
              <RequirementsList
                actionContentId={action.actionId}
                requirements={actionData?.companyAction?.requirements}
                requirementsContent={action?.requirements}
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
        {/* Render optional service provider comparison */}
        <PayWall
          primer={
            <EmptyState
              actions={[
                <Link href={SETTINGS_SUBSCRIPTION} key="upgrade" passHref>
                  <Button icon={<ThunderboltOutlined />} type="primary">
                    Upgrade
                  </Button>
                </Link>,
              ]}
              alignment="center"
              bordered={false}
              icon={<LockOutlined />}
              size="large"
              text="You can upgrade your plan anytime and share your climate journey on a custom microsite!"
              title="Locked"
              withBackground
            />
          }
        >
          {actionDataExtended?.companyAction.serviceProviderCollection ? (
            <ServiceProviderComparison
              loading={fetchingAttachmentsDataExtended}
              serviceProviderCollection={
                actionDataExtended.companyAction.serviceProviderCollection
              }
            />
          ) : (
            <EmptyState
              actions={[
                <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`} key="share">
                  <Button size="large" type="primary">
                    Share idea
                  </Button>
                </a>,
              ]}
              bordered
              icon={<BulbOutlined />}
              text={
                <div>
                  We are gradually adding more and more community powered
                  content to the platform. You can check the{' '}
                  <Link href={`/action/companyPledge`}>Measurement Action</Link>{' '}
                  as an example. If you have relevant content ideas for this
                  module, please share them with us!
                </div>
              }
              title="There is more to come..."
            />
          )}
        </PayWall>
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

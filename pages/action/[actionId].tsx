import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Drawer, Tabs } from 'antd'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionDetails, ActionsBar } from '../../components/ActionDetails'
import { Comments } from '../../components/Comments'
import { CompleteActionForm } from '../../components/CompleteActionForm'
import { Main, Section, Sider, SiderLayout } from '../../components/Layout'
import { ShowMore } from '../../components/ShowMore'
import {
  fetchAllActions,
  fetchAllServiceProviders,
} from '../../services/contentful'
import { ALL_ACTIONS } from '../../services/contentful'
import { renderTools } from '../../tools'

const { TabPane } = Tabs

const Action: NextPage = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const action = props.action

  return (
    <SiderLayout goBack={() => router.back()}>
      <Main>
        <Section>
          <ActionDetails action={action} />
        </Section>
        <Section>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab="Description">
              <ShowMore
                maxHeight={140}
                text={documentToReactComponents(action?.aboutText)}
              />
            </TabPane>
            <TabPane key="2" tab="Benefits">
              <ShowMore
                maxHeight={140}
                text={documentToReactComponents(action?.benefits)}
              />
            </TabPane>
          </Tabs>
        </Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s: any) => s.position === 'main'),
          props
        )}
      </Main>

      <Sider>
        <Section title="Your progress">
          <ActionsBar onComplete={() => setIsOpen(true)} />
        </Section>
        <Section title="Community">
          <Comments
            actionId={action?.actionId}
            comments={{
              '1': {
                id: '1',
                message: `Something about this action is great. I don't know what though`,
              },
              '2': {
                id: '2',
                message: 'This action is great! I love it!',
              },
            }}
          />
        </Section>
        <Section title="Attachments">Something</Section>
        {/* Render additional sections */}
        {renderTools(
          action?.customSections?.filter((s: any) => s.position === 'sider'),
          props
        )}
      </Sider>

      <Drawer onClose={() => setIsOpen(false)} visible={isOpen}>
        <CompleteActionForm />
      </Drawer>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const actionId: any = params?.actionId
  const actions: any = await fetchAllActions()
  const action = actions.byId[actionId]
  // @TODO: fetch additional data only if needed
  const serviceProviders = await fetchAllServiceProviders()

  return {
    props: {
      action,
      serviceProviders,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { byTags } = await fetchAllActions()
  const paths = byTags[ALL_ACTIONS].map((action: any) => ({
    params: { actionId: action.actionId },
  }))
  return {
    fallback: false,
    paths: paths,
  }
}

export default Action

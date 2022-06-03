import { Button, Drawer, message } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { UserActionsList } from '../../components/UserActionsList'
import {
  ContentfulQuestionnaireFields,
  fetchAllQuestionnaires,
} from '../../services/contentful'
import { useCompleteUserActionMutation } from '../../services/lfca-backend'
import { PersonalCarbonCalculator } from '../../tools'
import { withAuth } from '../../utils/with-auth'

interface PersonalFootprintCalculatorProps {
  questionnaires: Record<string, ContentfulQuestionnaireFields>
}

const PersonalFootprintCalculator: NextPage<
  PersonalFootprintCalculatorProps
> = ({ questionnaires }) => {
  const [open, setOpen] = useState(false)

  const [{ error, fetching }, completeUserAction] =
    useCompleteUserActionMutation()

  const handleSave = (val: number) => {
    completeUserAction({
      input: {
        actionContentId: 'personalPledge',
        isCompleted: true,
        values: {
          result: val,
        },
      },
    }).then(({ error }) => {
      if (!error) {
        setOpen(false)
        message.success('Your measurement has been saved')
      }
    })
  }

  return (
    <SiderLayout>
      <Main>
        <Section title="Personal Footprint Calculator" titleSize="big">
          <Container>
            <p>
              Calculate your personal carbon footprint. Figure out how much
              carbon you emit with your day to day lifestyle. Understand where
              you can reduce your personal footprint.
            </p>
            <Button onClick={() => setOpen(true)} size="large" type="primary">
              Start calculator
            </Button>

            <h3 style={{ marginTop: '60px' }}>Previous Measurements</h3>
            <UserActionsList />
          </Container>

          <Drawer
            className="fullscreen-drawer-bottom"
            height={'100%'}
            onClose={() => setOpen(false)}
            placement="bottom"
            visible={open}
          >
            <PersonalCarbonCalculator
              error={error}
              loading={fetching}
              questionnaire={questionnaires['eu-DE']}
              saveResult={handleSave}
            />
          </Drawer>
        </Section>
      </Main>
    </SiderLayout>
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

export default withAuth(PersonalFootprintCalculator)

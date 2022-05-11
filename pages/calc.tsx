
import type { GetStaticProps, NextPage } from 'next'

import { SiderLayout, Main, Section } from '../components/Layout'
import { fetchAllQuestionnaires } from '../services/contentful'
import { CarbonCalculator } from '../tools/PersonalCarbonCalculator'

const Calc: NextPage = (props: any) => {

    const saveResult = (val: any) => {
        // @TODO: save result to database
    }

    return (
        <SiderLayout>
            <Main>
                <Section title='Test' titleSize='big'>
                    <CarbonCalculator
                        questionnaire={props.questionnaires['eu-DE']}
                        saveResult={saveResult}
                    />
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

export default Calc

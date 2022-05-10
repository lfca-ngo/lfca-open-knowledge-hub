
import type { GetStaticProps, NextPage } from 'next'

import { SiderLayout, Main, Section } from '../components/Layout'
import { fetchAllQuestionnaires } from '../services/contentful'
import { CarbonCalculator } from '../tools/PersonalCarbonCalculator'

const Calc: NextPage = (props: any) => {
    // @TODO: replace with actual auth user 
    const questionnaire = props.questionnaires['eu-DE']
    console.log(questionnaire)
    return (
        <SiderLayout>
            <Main>
                <Section title='Test' titleSize='big'>
                    <CarbonCalculator
                        progress={0}
                        footprint={2}
                        goBack={() => console.log('back')}
                        answerQuestion={''}
                        activeQuestion={questionnaire.questions[0]}
                        activeAnswer={''}
                        reductionTips={[]}
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

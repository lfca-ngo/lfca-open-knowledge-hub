
import type { GetStaticProps, NextPage } from 'next'

import { SiderLayout, Main, Section } from '../components/Layout'
import { fetchAllQuestionnaires } from '../services/contentful'
import { CarbonCalculator } from '../tools/PersonalCarbonCalculator'
import { useState } from 'react'


const mapPeopleElectricty = (people: number) => {
    switch (people) {
        case 1:
            return 3300
        case 2:
            return (3300 * 1.5) / people
        case 3:
            return (3300 * 1.6) / people
        default:
            return (3300 * 2) / people
    }
}

// Helper function for calculating result
const calculateFootprint = (val: any, type: string, factor: number) => {
    switch (type) {
        case "energy":
        case "radio":
            return val
        case "inputNumber":
        case "inputCurrency":
            return val * factor
        case "electricity":
            return mapPeopleElectricty(val.people) * val.type
        case "housing": {
            const flatSize = val.flatsize || 0
            const flatMates = val.flatmates || 1
            const heatType = val.heattype || 0
            return (flatSize / flatMates) * heatType
        }
        case "fixed":
            return val.value * factor
        default:
            break
    }
}

const findEquals = (array: any, value: any) => {
    return array.find((elem: any) => elem.value === value)
}

const findSmaller = (array: any, value: any) => {
    return array.find((elem: any) => {
        // if there is no value, it is the worst scenario (open end)
        if (elem.value > 0) {
            return value < elem.value
        } else {
            return elem
        }
    })
}

const getTips = (options: any, value: any, algorithm: any) => {
    switch (algorithm) {
        case "smaller":
            return findSmaller(options, value)
        case "equals":
            return findEquals(options, value)
        case "electricity":
            return findEquals(options, value.type)
        case "housing":
            return findEquals(options, value.heattype)
        case "none":
            return null
        default:
            break
    }
}


// export const getAllReductionTips = (state) => {
//     const allTips = []
//     const { questions, answers } = state.carbonCalculator

//     answers.forEach((answer, i) => {
//       const { options, category, algorithm } = questions[i]
//       const { values } = answer

//       const tips = getTips(options, values, algorithm)
//       allTips.push({
//         ...tips,
//         category,
//       })
//     })
//     return allTips
//   }

type Result = {
    values: any,
    questionNumber: number,
    question: any
}

type Answer = {
    values: any,
    type: string,
    algorithmFactor: any
}

const Calc: NextPage = (props: any) => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [results, setResults] = useState<Result[]>([])
    const [total, setTotal] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    // init questionnaries
    const questionnaire = props.questionnaires['eu-DE']
    const activeQuestion = {
        ...questionnaire.questions[activeQuestionIndex],
        id: `${activeQuestionIndex}`,
    }

    const totalFootprint = (answers: any) => {
        let total = 0
        answers.forEach((answer: any) => {
            total += calculateFootprint(
                answer.values,
                answer.type,
                answer.algorithmFactor
            )
        })
        return total

    }

    const answerQuestion = (val: any, shouldContinue: boolean) => {
        // the answer is automatically updated on every input change
        // the shouldContinue flag indicates that the user wants to continue to the next question
        console.log(val, shouldContinue)
        if (shouldContinue) {
            setActiveQuestionIndex(activeQuestionIndex + 1)
        } else {
            // always update the answer in the state
            const result = {
                values: val,
                questionNumber: activeQuestionIndex,
                question: activeQuestion,
            }

            // replace data on activeQuestionIndex in results
            const newResults = [...results]
            newResults[activeQuestionIndex] = result
            setResults(newResults)

            // update the answers state
            const answer = {
                values: val,
                type: activeQuestion.type,
                algorithmFactor: activeQuestion.algorithmFactor,
            }
            const newAnswers = [...answers]
            newAnswers[activeQuestionIndex] = answer
            setAnswers(newAnswers)
            setTotal(totalFootprint(newAnswers))
        }
    }

    // @TODO: replace with actual auth user 

    console.log(results, activeQuestion, total)
    return (
        <SiderLayout>
            <Main>
                <Section title='Test' titleSize='big'>
                    <CarbonCalculator
                        progress={0}
                        footprint={total / 1000}
                        saveResult={(res: any) => console.log(res)}
                        answerQuestion={answerQuestion}
                        goBack={() => console.log('back')}
                        activeQuestion={activeQuestion}
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

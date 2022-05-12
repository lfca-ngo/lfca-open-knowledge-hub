import { CarbonCalculator } from './CarbonCalculator'
import { useState } from 'react'

type Answer = {
  values: any
  type: string
  algorithmFactor: any
  options: any
  category: any
  algorithm: any
}

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

const calculateFootprint = (val: any, type: string, factor: number) => {
  switch (type) {
    case 'energy':
    case 'radio':
      return val
    case 'inputNumber':
    case 'inputCurrency':
      return val * factor
    case 'electricity':
      return (
        (val.type &&
          val.people &&
          mapPeopleElectricty(val.people) * val.type) ||
        0
      )
    case 'housing': {
      const flatSize = val.flatsize || 0
      const flatMates = val.flatmates || 1
      const heatType = val.heattype || 0
      return (flatSize / flatMates) * heatType
    }
    case 'fixed':
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
    // if there is no value, assume worst case (open end)
    if (elem.value > 0) {
      return value < elem.value
    } else {
      return elem
    }
  })
}

const getTips = (options: any, value: any, algorithm: any) => {
  switch (algorithm) {
    case 'smaller':
      return findSmaller(options, value)
    case 'equals':
      return findEquals(options, value)
    case 'electricity':
      return findEquals(options, value.type)
    case 'housing':
      return findEquals(options, value.heattype)
    case 'none':
      return null
    default:
      break
  }
}

const getAllReductionTips = (answers: any) => {
  const allTips: any = []

  answers.forEach((answer: any) => {
    const { values, options, category, algorithm } = answer

    const tips = getTips(options, values, algorithm)
    allTips.push({
      ...tips,
      category,
    })
  })
  return allTips
}

export const CarbonCalculatorContainer = ({
  saveResult,
  questionnaire,
}: {
  saveResult: any
  questionnaire: any
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [tips, setTips] = useState([])

  // init questionnaries
  const questionsCount = questionnaire.questions.length
  const progress = (activeQuestionIndex / questionsCount) * 100
  const isLast = activeQuestionIndex === questionsCount
  const isBeforeLast = activeQuestionIndex === questionsCount - 1
  const activeAnswer = answers[activeQuestionIndex]
  const activeQuestion = {
    ...questionnaire.questions[activeQuestionIndex],
    id: `${isLast ? -1 : activeQuestionIndex}`,
  }

  // navigate flows
  const goBack = () => setActiveQuestionIndex(activeQuestionIndex - 1)
  const goNext = () => setActiveQuestionIndex(activeQuestionIndex + 1)

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
    if (shouldContinue) {
      // if it's the last question, calculate the results then go next
      if (isBeforeLast) {
        const tips = getAllReductionTips(answers)
        setTips(tips)
      }
      goNext()
    } else {
      // update the answers state
      const answer = {
        values: val,
        type: activeQuestion.type,
        algorithmFactor: activeQuestion.algorithmFactor,
        options: activeQuestion.options,
        category: activeQuestion.category,
        algorithm: activeQuestion.algorithm,
      }
      const newAnswers = [...answers]
      newAnswers[activeQuestionIndex] = answer
      setAnswers(newAnswers)
      setTotal(totalFootprint(newAnswers))
    }
  }

  return (
    <CarbonCalculator
      progress={progress}
      footprint={total / 1000}
      saveResult={saveResult}
      answerQuestion={answerQuestion}
      goBack={goBack}
      activeQuestion={activeQuestion}
      activeAnswer={activeAnswer}
      reductionTips={tips}
    />
  )
}

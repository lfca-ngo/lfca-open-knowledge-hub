import React from 'react'
import { Form, Button } from 'antd'
import renderSwitch from './renderSwitch'
import { Category } from './Category'
import classNames from 'classnames'

export const QuestionBlock = ({
  activeQuestion,
  activeAnswer,
  submit,
  goBack,
}: {
  activeQuestion: any
  activeAnswer: any
  submit: any
  goBack: any
}) => {
  const { id, question, category, message, type, hints, label, description } =
    activeQuestion
  const isHidden = activeQuestion.type === 'fixed'

  const handleSubmit = (allValues: any) => {
    submit(allValues[id], true)
  }

  const updateAnswer = (changedValues: any) => {
    submit(changedValues[id], false)
  }

  const housingValidator = (_: any, value: any, callback: any) => {
    if (value.flatmates > 0 && value.flatsize > 0 && value.heattype > 0) {
      return callback()
    }
    callback(new Error('Please fill in all fields'))
  }

  const itemRules =
    type === 'housing'
      ? { validator: housingValidator }
      : { required: true, message: message }
  const initialValue = activeAnswer ? activeAnswer.values : undefined

  return (
    <Form
      onFinish={handleSubmit}
      onValuesChange={updateAnswer}
      className={classNames('question-form', { 'is-hidden': isHidden })}
      initialValues={{ id: initialValue }}
    >
      <Category category={category} />
      <h1>{question}</h1>
      {description && <p>{description}</p>}
      {hints && (
        <ul className="hints">
          {hints.map((hint: any, i: any) => (
            <li key={`li-${i}`}>{hint}</li>
          ))}
        </ul>
      )}
      <Form.Item name={id} label={label} rules={[itemRules]}>
        {renderSwitch(activeQuestion)}
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Continue
        </Button>

        <Button type="link" size="large" onClick={goBack}>
          Back
        </Button>
      </Form.Item>
    </Form>
  )
}

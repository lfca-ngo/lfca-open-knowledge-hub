import { Button, Form } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { Category } from './Category'
import renderSwitch from './renderSwitch'

export const QuestionBlock = ({
  activeAnswer,
  activeQuestion,
  goBack,
  submit,
}: {
  activeQuestion: any
  activeAnswer: any
  submit: any
  goBack: any
}) => {
  const { category, description, hints, id, label, message, question, type } =
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
      : { message: message, required: true }
  const initialValue = activeAnswer ? activeAnswer.values : undefined

  return (
    <Form
      className={classNames('question-form', { 'is-hidden': isHidden })}
      initialValues={{ id: initialValue }}
      onFinish={handleSubmit}
      onValuesChange={updateAnswer}
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
      <Form.Item label={label} name={id} rules={[itemRules]}>
        {renderSwitch(activeQuestion)}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" size="large" type="primary">
          Continue
        </Button>

        <Button onClick={goBack} size="large" type="link">
          Back
        </Button>
      </Form.Item>
    </Form>
  )
}

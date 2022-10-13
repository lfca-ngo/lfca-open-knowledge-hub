import { DatePicker, Form, FormInstance, Input } from 'antd'

import { RecurrenceRuleInput } from '../RecurrenceRuleInput'
import { FormValues } from '.'

const { TextArea } = Input

interface FormItemsProps {
  form: FormInstance
}

export const FormItems = ({}: FormItemsProps) => {
  /* eslint-disable sort-keys */
  const formItems: { [key in keyof FormValues]: React.ReactNode } = {
    title: (
      <Form.Item
        key="title"
        label="Group title"
        name="title"
        rules={[{ message: 'Please enter a group title!', required: true }]}
      >
        <Input placeholder="Group XYZ" />
      </Form.Item>
    ),
    startEnd: (
      <Form.Item
        key="startEnd"
        label="Start/End date & time of the 1st event"
        name="startEnd"
        rules={[{ message: 'Please enter a time range!', required: true }]}
      >
        <DatePicker.RangePicker
          format="YYYY-MM-DD HH:mm"
          showTime={{
            format: 'HH:mm',
            minuteStep: 5,
          }}
        />
      </Form.Item>
    ),
    recurrenceRule: (
      <Form.Item
        key="recurrenceRule"
        label="Repeat"
        name="recurrenceRule"
        rules={[
          { message: 'Please choose a repetition cycle!', required: true },
        ]}
      >
        <RecurrenceRuleInput />
      </Form.Item>
    ),
    description: (
      <Form.Item key="description" label="Description" name="description">
        <TextArea placeholder="Description of the group" rows={4} />
      </Form.Item>
    ),
    videoConferenceUrl: (
      <Form.Item
        key="videoConferenceUrl"
        label="Video conference URL"
        name="videoConferenceUrl"
      >
        <Input placeholder="https://example.com/" type="url" />
      </Form.Item>
    ),
  }
  /* eslint-enable sort-keys */

  return (
    <>
      {Object.keys(formItems).map((key) => formItems[key as keyof FormValues])}
    </>
  )
}

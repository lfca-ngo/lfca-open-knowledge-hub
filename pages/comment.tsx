// import { Button, Form, Input } from 'antd'
import type { NextPage } from 'next'
import React from 'react'

import { OneColLayout } from '../components/Layout'
import { RichTextEditor } from '../components/RichTextEditor'

const Comment: NextPage = () => {
  // const handleFinish = (form) => {
  //   console.log(form)
  // }

  return (
    <OneColLayout>
      {/* <Form onFinish={handleFinish}>
        <Form.Item name="comment">
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      <RichTextEditor
        disabled={false}
        initialValue={[]}
        onChange={() => {
          // Nothing to do
        }}
      />
    </OneColLayout>
  )
}

export default Comment

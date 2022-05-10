import { Form, Input, Upload, Button } from 'antd'
import { Section } from '../Layout'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input


export const CompleteActionForm = () => {

    const handleFinish = (allValues: any) => {
        console.log('Success:', allValues)
    }

    return (
        <Section title='Complete Action'>
            <Form onFinish={handleFinish} layout='vertical'>
                <Form.Item label='Any learnings to share?'>
                    <TextArea placeholder='We created an overview of 10 banks and evaluated them based on x,y,z...' />
                </Form.Item>
                <Form.Item label='Upload docs'>
                    <Upload >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' block type='primary'>Submit</Button>
                </Form.Item>
            </Form>
        </Section>
    )
}
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'

import { DefaultStepProps } from '.'

export const CompanyInfo = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Welcome! 👋`}</h1>
      <div className="description">
        {`To get started, we need some basic information about the organization that you represent.`}
      </div>

      <Form layout="vertical">
        <Form.Item label="Company Name">
          <Input placeholder="Acme Inc." />
        </Form.Item>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label="Choose sectors">
              <Select placeholder="Please select">
                <Select.Option>Something</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Team size">
              <Select placeholder="Please select">
                <Select.Option>Something</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Checkbox>
            I hereby confirm that the organization I represent is not involved
            in fossil fuel extraction, xyz
          </Checkbox>
        </Form.Item>
      </Form>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
      </Space>
    </div>
  )
}

export const CompanyInfoSide = () => {
  return <div style={{ minWidth: '300px' }}>Side Content</div>
}

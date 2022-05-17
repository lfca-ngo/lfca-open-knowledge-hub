import { ArrowRightOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button } from 'antd'

export const FeaturedProvider = () => {
  return (
    <Alert
      action={[
        <Button icon={<ArrowRightOutlined />} key="start" type="primary">
          Open now
        </Button>,
      ]}
      description="As a lfca member you can use the Normative calculator for free. It is an expense based tool that covers all emissions including Scope 3."
      icon={
        <Avatar
          shape="square"
          size="large"
          src="/img/providers/normative.png"
        />
      }
      message="Get started with a free estimation"
      showIcon
      type="info"
    />
  )
}

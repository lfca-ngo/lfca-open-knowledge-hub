import { Button, Space, Tag } from 'antd'

export interface CompanyInfoProps {
  onNext: () => void
}

export const CompanyInfo = ({ onNext }: CompanyInfoProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Welcome!`}</h1>
      <p>
        {`The lfca platform is the place where we collect and share our
        community's knowledge. It's the place where we inspire you to realize
        the full climate action potential of your organization.`}
      </p>
      {/* <InfoCarousel elements={ELEMENTS} /> */}
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

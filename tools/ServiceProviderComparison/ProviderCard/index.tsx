require('./styles.less')

import { LinkOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card } from 'antd'
import Image from 'next/image'

export const ProviderCard = ({
  onClick,
  provider,
}: {
  provider: any
  onClick?: any
}) => {
  return (
    <Card bordered={false} className="provider-card" onClick={onClick}>
      <div className="hero">
        <div className="wrapper">
          {provider.logo && (
            <Image layout="fill" objectFit="contain" src={provider.logo?.url} />
          )}
        </div>
      </div>
      <div className="content">
        <div className="content-wrapper">
          <div className="title">{provider.name}</div>
          <div className="description">
            {documentToReactComponents(provider.description)}
          </div>
        </div>
      </div>
      <div className="actions">
        <Button icon={<LinkOutlined />} type="primary">
          View
        </Button>
      </div>
    </Card>
  )
}

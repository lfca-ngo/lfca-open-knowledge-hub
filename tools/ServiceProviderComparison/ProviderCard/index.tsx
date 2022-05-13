require('./styles.less')

import {
  LikeOutlined,
  PaperClipOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const ProviderCard = ({
  onClick,
  provider,
}: {
  provider: any
  onClick?: any
}) => {
  console.log('p', provider)
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

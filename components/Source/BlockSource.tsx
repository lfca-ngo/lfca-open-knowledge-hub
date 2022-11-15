import { EyeOutlined, FilePdfOutlined, LinkOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import React from 'react'

import { ContentfulSourceFields } from '../../services/contentful'

export interface LinkSettingsProps {
  href?: string
  onClick?: () => void
  rel?: string
  target?: string
}

export const BlockSource = ({
  linkSettings,
  title,
  type,
}: {
  linkSettings: LinkSettingsProps
  title: string
  type: ContentfulSourceFields['type']
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'image':
        return <EyeOutlined />
      case 'pdf':
        return <FilePdfOutlined />
      default:
        return <LinkOutlined />
    }
  }

  return (
    <a {...linkSettings}>
      <Avatar
        className="black-inverse"
        icon={renderIcon()}
        shape="square"
        size="large"
      />
      {title}
      <Button>Open</Button>
    </a>
  )
}

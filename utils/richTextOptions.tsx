import { EyeOutlined, FilePdfOutlined, LinkOutlined } from '@ant-design/icons'
import { BLOCKS, Node } from '@contentful/rich-text-types'
import { Button, Modal } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

import {
  ContentfulCallToActionFields,
  ContentfulSourceFields,
} from '../services/contentful'

const CallToAction = ({ slug, title }: ContentfulCallToActionFields) => {
  const Cta = () => (
    <Button
      block
      className="rich-text-entry-btn"
      size="large"
      style={{ margin: '8px 0' }}
    >
      {title}
    </Button>
  )

  if (slug) {
    return (
      <Link href={`/${slug}`}>
        <Cta />
      </Link>
    )
  } else return <Cta />
}

const Source = ({ file, title, type, url }: ContentfulSourceFields) => {
  const [isVisible, setIsVisible] = useState(false)
  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  // by default take the url
  const fileUrl = url || `https:${file?.fields?.file?.url}`

  const render = () => {
    switch (type) {
      case 'pdf':
        return (
          <a href={fileUrl} rel="noreferrer" target="_blank">
            <FilePdfOutlined style={{ marginRight: '8px' }} />
            {title}
          </a>
        )
      case 'link':
        return (
          <a href={fileUrl} rel="noreferrer" target="_blank">
            <LinkOutlined style={{ marginRight: '8px' }} />
            {title}
          </a>
        )
      case 'image':
        return (
          <Button
            className="simple"
            icon={<EyeOutlined />}
            onClick={openModal}
            style={{ padding: '0' }}
            type="link"
          >
            {title}
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div style={{ margin: '4px 0' }}>
      {render()}
      <Modal onCancel={closeModal} visible={isVisible}>
        <img src={fileUrl} style={{ maxWidth: '100%' }} />
      </Modal>
    </div>
  )
}

export const options = {
  renderNode: {
    // eslint-disable-next-line react/display-name
    [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
      if (!node.data.target) return null
      const { fields, sys } = node.data.target
      const typename = sys?.contentType?.sys?.id

      switch (typename) {
        case 'source':
          return <Source {...fields} />
        case 'callToAction':
          return <CallToAction {...fields} />
        default:
          return null
      }
    },
  },
}

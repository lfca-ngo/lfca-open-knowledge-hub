import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

import { Source } from '../components/Source'
import { ContentfulCallToActionFields } from '../services/contentful'

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
    [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
      if (!node.data.target) return null

      const { fields, sys } = node.data.target
      const typename = sys?.contentType?.sys?.id

      switch (typename) {
        case 'source':
          return <Source {...fields} inline />
        default:
          return null
      }
    },
  },
}

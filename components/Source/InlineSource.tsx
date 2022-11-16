import React from 'react'

import { ContentfulSourceFields } from '../../services/contentful'
import { LinkSettingsProps } from './BlockSource'

export const InlineSource = ({
  linkSettings,
  title,
}: {
  linkSettings: LinkSettingsProps
  title: string
  type: ContentfulSourceFields['type']
}) => {
  return <a {...linkSettings}>{title}</a>
}

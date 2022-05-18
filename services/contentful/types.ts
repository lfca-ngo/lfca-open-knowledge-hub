import { Document } from '@contentful/rich-text-types'

export interface ContentfulTagFields {
  name: string
}

interface Image {
  url: string
}

export interface ContentfulServiceProviderFields {
  model?: ContentfulTagFields[]
  services?: ContentfulTagFields[]
  supplyChainComplexity?: ContentfulTagFields[]
  name?: string
  providerId: string
  logo?: Image
  description: Document
  year?: string
  size?: string
  website?: string
  memberId?: string
}

export interface ContentfulCommunityContent {
  title: string
  description: Document
  link: string
  preview?: Image
}

export interface ContentfulContentCollection {
  collectionId: string
  content: ContentfulCommunityContent[]
}

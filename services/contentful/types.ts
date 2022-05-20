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

export interface ContentfulCommunityContentFields {
  title: string
  description: Document
  link: string
  preview?: Image
}

export interface ContentfulContentCollectionFields {
  collectionId: string
  content: ContentfulCommunityContentFields[]
}

export interface ContentfulRequirementFields {
  title: string
  reqId: string
  howTo: Document
}

export interface ContentfulCategoryFields {
  categoryId: string
  name: string
  sortingWeight?: number
}

interface ContentfulCustomSectionFields {
  componentId: string
  title: string
  bordered: boolean
  size: string
  position: string
  className: string
}

export interface ContentfulActionFields {
  title: string
  actionId: string
  requirements: ContentfulRequirementFields[]
  tags: ContentfulCategoryFields[]
  heroImage: Image
  impactValue: number
  aboutText: Document
  benefits: Document
  examples: Document
  extraMile: Document
  expiresAfterDays: number
  customSections: ContentfulCustomSectionFields[]
}

export interface ContentfulContinentFields {
  name: string
  isoCode: string
}

export interface ContentfulCountryFields {
  name: string
  isoCode: string
  continent: ContentfulContinentFields
}

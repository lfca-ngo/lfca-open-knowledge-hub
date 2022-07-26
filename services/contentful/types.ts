import { Document } from '@contentful/rich-text-types'

interface Image {
  url: string
}

interface Video {
  url: string
}

interface ContentfulMedia {
  fields: {
    file: {
      url: string
    }
  }
}

export interface ContentfulCommunityContentFields {
  title: string
  description: Document
  link: string
  preview?: Image
}

export interface ContentfulFeatureFields {
  title: string
  description: Document
  picture?: Image
  video?: Video
  contentId?: string
  disabled: boolean
}

export interface ContentfulPricingFields {
  price: number
  maxEmployees?: number
}

export interface ContentfulSubscriptionFields {
  name: string
  description: Document
  pricing: ContentfulPricingFields[]
  features: ContentfulFeatureFields[]
  icon: Image
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

export interface ContentfulOptionFields {
  title: string
  value: number
  resultTitle: string
  resultText: string
}

export interface ContentfulProgramFields {
  name: string
  programId: number
}

export interface ContentfulQuestionFields {
  question: string
  description: string
  type: string
  label: string
  message: string
  hints: string[]
  category: string
  currency: string
  initialValue: string
  options: ContentfulOptionFields[]
  algorithm: string
  algorithFactor: number
}

export interface ContentfulQuestionnaireFields {
  name: string
  countryCode: string
  questions: ContentfulQuestionFields[]
}

export interface ContentfulSourceFields {
  title: string
  type: 'link' | 'image' | 'pdf'
  file?: ContentfulMedia
  url?: string
}

export interface ContentfulCallToActionFields {
  slug?: string
  type?: 'primary' | 'default' | 'link'
  title: string
  url?: string
}

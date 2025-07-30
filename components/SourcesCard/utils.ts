import { ContentfulSourceFields } from '../../services/contentful'

// type def for source types
type SourceType = 'Google Sheets' | 'Google Slides' | 'Miro' | 'Other'

export const SOURCE_TYPES: Record<string, SourceType> = {
  googleSheets: 'Google Sheets',
  googleSlides: 'Google Slides',
  miro: 'Miro',
  other: 'Other',
} as const

export const getSourceType = (item: ContentfulSourceFields) => {
  const isMiroUrl = item.url?.toLowerCase().includes('miro.com')
  const isGoogleSlidesUrl = item.url
    ?.toLowerCase()
    .includes('docs.google.com/presentation')
  const isGoogleSheetsUrl = item.url
    ?.toLowerCase()
    .includes('docs.google.com/spreadsheets')

  return isMiroUrl
    ? SOURCE_TYPES.miro
    : isGoogleSlidesUrl
    ? SOURCE_TYPES.googleSlides
    : isGoogleSheetsUrl
    ? SOURCE_TYPES.googleSheets
    : SOURCE_TYPES.other
}

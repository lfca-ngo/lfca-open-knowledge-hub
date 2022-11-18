import ALL_TAGS from '../../public/data/_company-tags-data.json'

export const COMPANY_MODELS = ['impact by design', 'physical supply chain']

export const COMPANY_TAGS = (ALL_TAGS as unknown as string[]).filter(
  (t) => !COMPANY_MODELS.includes(t)
)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulCountryFields } from './types'

export interface Country extends ContentfulCountryFields {
  countryCode: string
}

export const fetchAllCountries = async () => {
  const res = await getEntries({
    content_type: 'country',
    include: 2,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const countries = JSON.parse(stringifiedData)

  const withFullCountryCode = countries
    .map((country: ContentfulCountryFields) => ({
      ...country,
      countryCode: `${country.continent.isoCode}-${country.isoCode}`,
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name)) as Country[]

  return withFullCountryCode
}

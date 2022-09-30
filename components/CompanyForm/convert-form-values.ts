import { UpdateCompanyInput } from '../../services/lfca-backend'
import { FormValues } from '.'

export const convertFormValues = (values: FormValues): UpdateCompanyInput => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, aboutSections, companyTags, ...rest } = values
  return {
    ...rest,
    // If initial values are provided, the sections already contain a `__typename` prop which is not allowed as an input
    aboutSections: aboutSections?.map((section) => ({
      heading: section?.heading,
      imageUrl: section?.imageUrl,
      text: section?.text,
    })),
    // The ImageUploadMulti component's value contains `status` and `uid` props for each file,
    // which are not valid for the update mutation and need to be removed
    campaignFiles: rest.campaignFiles?.map((file) => ({
      name: file.name,
      url: file.url,
    })),
    tags: companyTags,
  }
}

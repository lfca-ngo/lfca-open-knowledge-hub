import { EmptyCommunityContent } from '../components/EmptyStates'
import { Section } from '../components/Layout'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

import { MEASUREMENT_SERVICES_COMPARISON } from '../utils'

export const renderTools = (
  sections: any,
  props: any,
  showEmptyState?: boolean
) => {
  const renderTool = (section: any) => {
    switch (section.componentId) {
      case MEASUREMENT_SERVICES_COMPARISON:
        return (
          <Section
            className={section?.className}
            key={section?.componentId}
            {...section}
          >
            <ServiceProviderComparison providers={props?.serviceProviders} />
          </Section>
        )
      default:
        return null
    }
  }

  return (
    sections?.map(renderTool) ||
    (showEmptyState ? <EmptyCommunityContent /> : null)
  )
}

import { Section } from '../components/Layout'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

export const MEASUREMENT_SERVICES_COMPARISON = 'measurement-services-comparison'

export const renderTools = (sections: any, props: any) => {
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

  return sections?.map(renderTool) || null
}

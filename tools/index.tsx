import { Section } from '../components/Layout'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

export const renderTools = (sections: any, props: any) => {
  const renderTool = (section: any) => {
    switch (section.componentId) {
      case 'measurement-services-comparison':
        return (
          <Section key={section.componentId} {...section}>
            <ServiceProviderComparison providers={props?.serviceProviders} />
          </Section>
        )
      default:
        return null
    }
  }

  return sections?.map(renderTool) || null
}

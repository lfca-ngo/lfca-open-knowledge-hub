import { ArrowRightOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button } from 'antd'

import { FeaturedServiceProviderFragment } from '../../../services/lfca-backend'

interface FeaturedProviderProps {
  onOpenWebsite: (url: string) => void
  serviceProvider: FeaturedServiceProviderFragment
}

export const FeaturedProvider = ({
  onOpenWebsite,
  serviceProvider,
}: FeaturedProviderProps) => {
  return (
    <Alert
      action={
        serviceProvider.featureCta
          ? [
              <Button
                icon={<ArrowRightOutlined />}
                key="start"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                onClick={() => onOpenWebsite(serviceProvider.featureCta!)}
                type="primary"
              >
                Open now
              </Button>,
            ]
          : []
      }
      description={serviceProvider.featureDescription}
      icon={
        serviceProvider.featureImage ? (
          <Avatar
            shape="square"
            size="large"
            src={serviceProvider.featureImage.url}
          />
        ) : null
      }
      message={serviceProvider.featureTitle}
      showIcon
      type="info"
    />
  )
}

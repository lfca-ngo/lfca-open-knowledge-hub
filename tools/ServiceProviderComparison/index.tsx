require('./styles.less')

import { List } from 'antd'
import { ProviderCard } from './ProviderCard'

export const ServiceProviderComparison = (props: any) => {
  return (
    <div className="service-provider-comparison">
      <List
        dataSource={props?.providers}
        renderItem={(item: any) => (
          <List.Item>
            <ProviderCard provider={item} />
          </List.Item>
        )}
      />
    </div>
  )
}

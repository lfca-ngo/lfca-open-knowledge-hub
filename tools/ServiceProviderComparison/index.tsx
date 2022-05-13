import { List } from 'antd'

export const ServiceProviderComparison = (props: any) => {
  console.log('services', props?.providers)
  return (
    <div>
      <List
        dataSource={props?.providers}
        renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
      />
    </div>
  )
}

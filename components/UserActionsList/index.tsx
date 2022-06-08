import { CalculatorOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd'

import { useUserActionsListQuery } from '../../services/lfca-backend'
import { toReadibleDate } from '../../utils'

export const UserActionsList = () => {
  const [{ data: expiredData }] = useUserActionsListQuery({
    variables: {
      input: {
        filter: {
          isExpired: true,
        },
      },
    },
  })
  const [{ data: completedData }] = useUserActionsListQuery({
    variables: {
      input: {
        filter: {
          isCompleted: true,
        },
      },
    },
  })

  const allData = [
    ...(completedData?.userActions || []),
    ...(expiredData?.userActions || []),
  ]

  return (
    <List
      className="simple-list"
      dataSource={allData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                className="wine-inverse"
                icon={<CalculatorOutlined />}
                shape="square"
                size="large"
              />
            }
            description={toReadibleDate(item.completedAt)}
            title={`Your footprint: ${item.values?.result}`}
          />
        </List.Item>
      )}
    />
  )
}

import { CalculatorOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd'

import { useUserActionsListQuery } from '../../services/lfca-backend'
import { toReadibleDate } from '../../utils'

export const UserActionsList = () => {
  const [{ data }] = useUserActionsListQuery({
    variables: {
      input: {
        filter: {
          isCompleted: true,
        },
      },
    },
  })
  return (
    <List
      className="simple-list"
      dataSource={data?.userActions}
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

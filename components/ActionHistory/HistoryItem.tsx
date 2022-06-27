import { DatabaseOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import flat from 'flat'
import { useMemo, useState } from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'

export const HistoryItem = ({
  action,
}: {
  action: CompanyActionListItemFragment
}) => {
  const [visible, setVisible] = useState(false)
  const parsedNotes = useMemo(() => {
    let parsed = ''
    try {
      parsed = JSON.parse(action?.notes || '')
      const flattened = flat.flatten(parsed) as any
      const asArray = Object.keys(flattened).map((k) => ({
        key: k,
        value: flattened[k],
      }))
      return asArray
    } catch (error) {
      // show an error message
      parsed = `Could not get data. Please reach out to ${DEFAULT_SUPPORT_EMAIL}`
    }
  }, [action])

  return (
    <div>
      {typeof parsedNotes === 'string' ? (
        parsedNotes
      ) : (
        <Button
          icon={<DatabaseOutlined />}
          onClick={() => setVisible(true)}
          size="small"
        >
          Show data
        </Button>
      )}
      <Modal
        onCancel={() => setVisible(false)}
        visible={visible}
        wrapClassName="modal-md"
      >
        <h3>Data</h3>
        <Table
          columns={[
            {
              dataIndex: 'key',
              key: 'key',
              title: 'Key',
            },
            {
              dataIndex: 'value',
              key: 'value',
              title: 'Value',
            },
          ]}
          dataSource={parsedNotes}
          pagination={false}
        />
      </Modal>
    </div>
  )
}

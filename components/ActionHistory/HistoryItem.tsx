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
  const isStringNote = typeof action?.notes === 'string'

  const parsedNotes = useMemo(() => {
    try {
      // if possible return as flattened array
      const parsed = JSON.parse(action?.notes || '')
      const flattened = flat.flatten(parsed) as any
      const asArray = Object.keys(flattened).map((k) => ({
        key: k,
        value: flattened[k],
      }))
      return asArray
    } catch (error) {
      // return as string
      return isStringNote
        ? `${action?.notes}`
        : `Could not get data. Please reach out to ${DEFAULT_SUPPORT_EMAIL}`
    }
  }, [action, isStringNote])

  return (
    <div>
      {isStringNote ? (
        `${parsedNotes}`
      ) : (
        <Button
          icon={<DatabaseOutlined />}
          onClick={() => setVisible(true)}
          size="small"
        >
          Show data
        </Button>
      )}
      {/* render as Table in Modal */}
      {Array.isArray(parsedNotes) && (
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
      )}
    </div>
  )
}

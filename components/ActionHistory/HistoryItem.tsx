import { DatabaseOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Table, Tag } from 'antd'
import flat from 'flat'
import { useMemo, useState } from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import {
  DEFAULT_SUPPORT_EMAIL,
  LEGACY_CALCULATOR_VALUES_SHEET,
} from '../../utils'

export const HistoryItem = ({
  action,
}: {
  action: CompanyActionListItemFragment
}) => {
  const [visible, setVisible] = useState(false)

  const parsedNotes = useMemo(() => {
    try {
      // if possible return as flattened array
      const parsed = JSON.parse(action?.notes || '')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const flattened = flat.flatten(parsed) as any
      const asArray = Object.keys(flattened).map((k) => ({
        key: k,
        value: flattened[k],
      }))
      return asArray
    } catch (error) {
      // return as string
      return (
        action?.notes ||
        `No data stored. Questions? Reach out to ${DEFAULT_SUPPORT_EMAIL}`
      )
    }
  }, [action])

  const isDataArray = Array.isArray(parsedNotes)

  return (
    <div>
      {/* render as string or show a button to open modal */}
      {isDataArray ? (
        <Button
          icon={<DatabaseOutlined />}
          onClick={() => setVisible(true)}
          size="small"
        >
          Show data
        </Button>
      ) : (
        parsedNotes
      )}
      {/* render as Table in Modal */}
      {isDataArray && (
        <Modal
          onCancel={() => setVisible(false)}
          open={visible}
          wrapClassName="modal-md"
        >
          <Space align="center" direction="horizontal">
            <h3>Data</h3>
            <a
              href={LEGACY_CALCULATOR_VALUES_SHEET}
              rel="noreferrer"
              target="_blank"
            >
              <Tag
                style={{
                  cursor: 'pointer',
                  marginBottom: '0.5em',
                  padding: '4px 8px',
                }}
              >
                <InfoCircleOutlined /> Documentation
              </Tag>
            </a>
          </Space>
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

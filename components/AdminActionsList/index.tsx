require('./styles.less')

import { Drawer, Form, message, Tabs } from 'antd'
import { useState } from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { ActionsList } from './ActionsList'

const { TabPane } = Tabs

export const AdminActionsList = () => {
  const [selectedAction, setSelectedAction] = useState<
    CompanyActionListItemFragment | undefined
  >()
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >()

  const [form] = Form.useForm()

  return (
    <div className="admin-companies-list">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(_, { companyId }) => setSelectedCompanyId(companyId)}
      >
        <Form.Item label="Company" name="companyId">
          <CompanyIdSearchInput />
        </Form.Item>
      </Form>

      <Tabs>
        <TabPane key="default" tab="Default">
          <ActionsList
            selectedCompanyId={selectedCompanyId}
            setSelectedAction={setSelectedAction}
          />
        </TabPane>
        <TabPane key="expired" tab="Expired">
          <ActionsList
            isExpired
            selectedCompanyId={selectedCompanyId}
            setSelectedAction={setSelectedAction}
          />
        </TabPane>
      </Tabs>

      <Drawer
        onClose={() => setSelectedAction(undefined)}
        visible={!!selectedAction}
      >
        Hallo
      </Drawer>
    </div>
  )
}

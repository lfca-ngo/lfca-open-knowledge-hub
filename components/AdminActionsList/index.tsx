require('./styles.less')

import { Form, Tabs } from 'antd'
import { useState } from 'react'

import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { ActionsList } from './ActionsList'

const { TabPane } = Tabs

export const AdminActionsList = () => {
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
          <ActionsList selectedCompanyId={selectedCompanyId} />
        </TabPane>
        <TabPane key="expired" tab="Expired">
          <ActionsList isExpired selectedCompanyId={selectedCompanyId} />
        </TabPane>
      </Tabs>
    </div>
  )
}

import { Form, Tabs } from 'antd'
import { useState } from 'react'

import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { ActionsList } from './ActionsList'

export const AdminActionsList = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >()

  const [form] = Form.useForm()

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(_, { companyId }) => setSelectedCompanyId(companyId)}
      >
        <Form.Item label="Company" name="companyId">
          <CompanyIdSearchInput />
        </Form.Item>
      </Form>

      <Tabs
        items={[
          {
            children: <ActionsList selectedCompanyId={selectedCompanyId} />,
            key: 'default',
            label: 'Default',
          },
          {
            children: (
              <ActionsList isExpired selectedCompanyId={selectedCompanyId} />
            ),
            key: 'expired',
            label: 'Expired',
          },
        ]}
      />
    </div>
  )
}

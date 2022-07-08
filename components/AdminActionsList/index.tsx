require('./styles.less')

import { Button, Drawer, Form, Input, message, List, Tabs } from 'antd'

import { useRef, useState } from 'react'

import { useCompanyActionsListQuery } from '../../services/lfca-backend'

import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { ActionsList } from './ActionsList'

const { TabPane } = Tabs

export const AdminActionsList = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >()
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()

  const [{ data: searchData, fetching: isFetchingSearch }] =
    useCompanyActionsListQuery({
      pause: !selectedCompanyId,
      variables: {
        input: {
          filter: {
            companyId: selectedCompanyId,
          },
        },
      },
    })

  console.log(searchData)

  return (
    <div className="admin-companies-list">
      <Form
        form={form}
        onValuesChange={(_, { companyId }) => setSelectedCompanyId(companyId)}
      >
        <Form.Item name="companyId">
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

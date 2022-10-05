import { DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, message, Popconfirm, Space } from 'antd'
import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/user'
import { Country, Program } from '../../services/contentful'
import {
  useCompanyQuery,
  useDeleteUserMutation,
  UserFragment,
  useUpdateUserMutation,
} from '../../services/lfca-backend'
import { RemoveNull } from '../../types'
import { removeObjectNullProps } from '../../utils'
import { CompanyForm } from '../CompanyForm'
import { FormItems } from './FormItems'

export type FormValues = Omit<RemoveNull<UserFragment>, 'company' | 'id'> & {
  companyId: string
}

export interface UserFormProps {
  countries?: Country[]
  filterByKeys?: (keyof FormValues)[]
  initialValues?: UserFragment
  isLoadingInitialValues?: boolean
  onDeleted?: () => void
  onUpdated?: () => void
  programs?: Program[]
}

const parseInitialValues = (
  initialValues?: UserFragment
): FormValues | undefined => {
  if (!initialValues) return undefined
  const { company, ...values } = removeObjectNullProps(initialValues)

  return initialValues
    ? {
        companyId: company?.id ?? '',
        ...values,
      }
    : undefined
}

export const UserForm = ({
  countries,
  filterByKeys,
  initialValues,
  isLoadingInitialValues = false,
  onDeleted,
  onUpdated,
  programs,
}: UserFormProps) => {
  const { isAdmin } = useUser()
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >()

  const [{ fetching: isUpdatingUser }, updateUser] = useUpdateUserMutation()
  const [{ fetching: isDeletingUser }, deleteUser] = useDeleteUserMutation()
  const [{ data: companyData, fetching: fetchingCompany }] = useCompanyQuery({
    pause: !isAdmin || !selectedCompanyId,
    variables: {
      input: {
        companyId: selectedCompanyId,
      },
    },
  })

  const handleSubmit = (allValues: FormValues) => {
    updateUser({
      input: {
        userId: initialValues?.id,
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success(`${isAdmin ? 'User' : 'Profile'} updated`)
      onUpdated?.()
    })
  }

  const handleDelete = () => {
    if (!initialValues?.id) return

    deleteUser({
      input: {
        userId: initialValues.id,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('User deleted')
        onDeleted?.()
      }
    })
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(parseInitialValues(initialValues))
  }, [initialValues, form])

  return (
    <>
      <Form
        form={form}
        initialValues={parseInitialValues(initialValues)}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <FormItems
          countries={countries}
          filterByKeys={filterByKeys}
          onNavigateToCompany={setSelectedCompanyId}
        />

        <Form.Item>
          <Space>
            <Button
              disabled={isLoadingInitialValues}
              htmlType="submit"
              loading={isUpdatingUser}
              type="primary"
            >
              Save
            </Button>

            {isAdmin ? (
              <>
                <Popconfirm
                  cancelText="No"
                  okText="Yes"
                  onConfirm={handleDelete}
                  title="Are you sure to delete this user?"
                >
                  <Button
                    danger
                    disabled={isLoadingInitialValues}
                    icon={<DeleteOutlined />}
                    loading={isDeletingUser}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </>
            ) : null}
          </Space>
        </Form.Item>
      </Form>

      {isAdmin ? (
        <Drawer
          className="drawer-md"
          destroyOnClose
          onClose={() => setSelectedCompanyId(undefined)}
          open={!!selectedCompanyId}
        >
          <>
            <h1>Update Company</h1>
            <CompanyForm
              countries={countries}
              initialValues={companyData?.company}
              isLoadingInitialValues={fetchingCompany}
              programs={programs}
              showConnectedUsers={true}
              type="update"
            />
          </>
        </Drawer>
      ) : null}
    </>
  )
}

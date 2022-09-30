import { DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, message, Popconfirm, Space } from 'antd'
import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/user'
import { Country, Program } from '../../services/contentful'
import {
  CompanyFragment,
  CreateCompanyInput,
  UpdateCompanyInput,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  UserFragment,
  useUpdateCompanyMutation,
  useUsersQuery,
} from '../../services/lfca-backend'
import { RemoveNull } from '../../types'
import { removeObjectNullProps } from '../../utils'
import { UserForm } from '../UserForm'
import { ConnectedUsersList } from './ConnectedUsersList'
import { convertFormValues } from './convert-form-values'
import { FormItems } from './FormItems'

export type FormValues = Omit<
  RemoveNull<CompanyFragment>,
  'id' | 'program' | 'tags'
> & {
  // antd has an issue when we have an input with a name of `tags` which is why we need to rename the prop in the form
  companyTags: string[]
  programContentId?: string
}

export interface CompanyFormProps {
  countries?: Country[]
  filterByKeys?: (keyof FormValues)[]
  initialValues?: CompanyFragment
  isLoadingInitialValues?: boolean
  onCreated?: () => void
  onDeleted?: () => void
  onUpdated?: () => void
  programs?: Program[]
  showConnectedUsers?: boolean
  type: 'create' | 'update'
}

const parseInitialValues = (
  initialValues?: CompanyFragment
): FormValues | undefined => {
  if (!initialValues) return undefined
  const { program, tags, ...values } = removeObjectNullProps(initialValues)

  return initialValues
    ? {
        companyTags: tags.map((t) => t.name),
        programContentId: program.contentId,
        ...values,
      }
    : undefined
}

export const CompanyForm = ({
  countries,
  filterByKeys,
  initialValues,
  isLoadingInitialValues = false,
  onCreated,
  onDeleted,
  onUpdated,
  programs,
  showConnectedUsers = false,
  type,
}: CompanyFormProps) => {
  const { isAdmin } = useUser()

  const [selectedUser, setSelectedUser] = useState<UserFragment | undefined>()

  const [{ fetching: isCreatingCompany }, createCompany] =
    useCreateCompanyMutation()
  const [{ fetching: isDeletingCompany }, deleteCompany] =
    useDeleteCompanyMutation()
  const [{ fetching: isUpdatingCompany }, updateCompany] =
    useUpdateCompanyMutation()
  const [{ data: usersData, fetching: isFetchingUsers }] = useUsersQuery({
    pause:
      !showConnectedUsers ||
      type !== 'update' ||
      !isAdmin ||
      !initialValues?.id,
    variables: {
      input: {
        filter: {
          companyId: initialValues?.id,
        },
        // NOTE:
        // We do not have pagination implemented here and just assume
        // that a company will not have more than 20 users
        take: 20,
      },
    },
  })

  const handleSubmit = (allValues: CreateCompanyInput | UpdateCompanyInput) => {
    if (type === 'create') {
      createCompany({
        input: allValues as CreateCompanyInput,
      }).then(({ error }) => {
        if (error) message.error(error.message)
        else {
          message.success('Company created')
          onCreated?.()
        }
      })
    } else {
      updateCompany({
        input: {
          companyId: initialValues?.id,
          ...allValues,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        else message.success(`${isAdmin ? 'Profile' : 'Company'} updated`)
        onUpdated?.()
      })
    }
  }

  const handleDelete = () => {
    if (!initialValues?.id) return

    deleteCompany({
      input: {
        companyId: initialValues.id,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Company deleted')
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
        onFinish={(allValues: FormValues) => {
          handleSubmit(convertFormValues(allValues))
        }}
      >
        <FormItems
          countries={countries}
          filterByKeys={filterByKeys}
          form={form}
          programs={programs}
        />

        {showConnectedUsers && type === 'update' && isAdmin ? (
          <ConnectedUsersList
            items={usersData?.users.items || []}
            loading={isFetchingUsers}
            onSelectItem={setSelectedUser}
          />
        ) : null}

        <Form.Item>
          <Space>
            <Button
              disabled={isLoadingInitialValues}
              htmlType="submit"
              loading={isCreatingCompany || isUpdatingCompany}
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
                  title="Are you sure to delete this company?"
                >
                  <Button
                    danger
                    disabled={isLoadingInitialValues}
                    icon={<DeleteOutlined />}
                    loading={isDeletingCompany}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </>
            ) : null}
          </Space>
        </Form.Item>
      </Form>

      {showConnectedUsers && isAdmin ? (
        <Drawer
          className="drawer-md"
          destroyOnClose
          onClose={() => setSelectedUser(undefined)}
          visible={!!selectedUser}
        >
          <>
            <h1>Update User</h1>
            <UserForm
              countries={countries}
              initialValues={selectedUser}
              onDeleted={() => setSelectedUser(undefined)}
              programs={programs}
            />
          </>
        </Drawer>
      ) : null}
    </>
  )
}

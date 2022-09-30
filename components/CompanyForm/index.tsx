import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Popconfirm, Space } from 'antd'
import { useEffect } from 'react'

import { useUser } from '../../hooks/user'
import { Country, Program } from '../../services/contentful'
import {
  CompanyFragment,
  CreateCompanyInput,
  UpdateCompanyInput,
} from '../../services/lfca-backend'
import { RemoveNull } from '../../types'
import { removeObjectNullProps } from '../../utils'
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
  isLoading?: boolean
  onCreate?: (values: CreateCompanyInput) => void
  onDelete?: () => void
  onUpdate?: (values: UpdateCompanyInput) => void
  programs?: Program[]
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
  isLoading = false,
  onCreate,
  onDelete,
  onUpdate,
  programs,
  type,
}: CompanyFormProps) => {
  const { isAdmin } = useUser()

  const handleSubmit = (allValues: UpdateCompanyInput) => {
    if (type === 'create') onCreate?.(allValues as CreateCompanyInput)
    else onUpdate?.(allValues as UpdateCompanyInput)
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(parseInitialValues(initialValues))
  }, [initialValues, form])

  return (
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

      <Form.Item>
        <Space>
          <Button htmlType="submit" loading={isLoading} type="primary">
            Save
          </Button>

          {isAdmin ? (
            <>
              <Popconfirm
                cancelText="No"
                okText="Yes"
                onConfirm={onDelete}
                title="Are you sure to delete this company?"
              >
                <Button danger icon={<DeleteOutlined />} loading={isLoading}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}

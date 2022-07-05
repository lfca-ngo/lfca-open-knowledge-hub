require('./styles.less')

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, message, Space, Table } from 'antd'
import _debounce from 'lodash.debounce'
import { useRef, useState } from 'react'

import { Country, Program } from '../../services/contentful'
import {
  CreateCompanyInput,
  UpdateCompanyInput,
  useCompaniesQuery,
  useCreateCompanyExportMutation,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useSearchCompanyQuery,
  useUpdateCompanyMutation,
} from '../../services/lfca-backend'
import { CompanyFragment } from '../../services/lfca-backend'
import { CompanyForm } from '../CompanyForm'

interface AdminCompaniesListProps {
  countries: Country[]
  programs: Program[]
}

const { Column } = Table
const { Search } = Input

export const AdminCompaniesList = ({
  countries,
  programs,
}: AdminCompaniesListProps) => {
  const [selectedCompany, setSelectedCompany] = useState<
    CompanyFragment | undefined
  >()
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()

  // Debounced search filters
  const [uidFilter, setUidFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')

  // cursors for pagination
  const [cursor, setCursor] = useState<string | null>(null)
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([])

  const debouncedUidFilter = useRef(
    _debounce(async (value) => {
      setNameFilter('')
      setCursor(null)
      setUidFilter(value)
    }, 500)
  ).current

  const debouncedNameFilter = useRef(
    _debounce(async (value) => {
      setUidFilter('')
      setCursor(null)
      setNameFilter(value)
    }, 500)
  ).current

  const [{ fetching: isCreatingCompany }, createCompany] =
    useCreateCompanyMutation()
  const [{ fetching: isDeletingCompany }, deleteCompany] =
    useDeleteCompanyMutation()
  const [{ fetching: isUpdatingCompany }, updateCompany] =
    useUpdateCompanyMutation()
  const [{ fetching: isExporting }, exportCompanies] =
    useCreateCompanyExportMutation()

  const [{ data: companiesData, fetching: isFetchingCompanies }] =
    useCompaniesQuery({
      pause: !!nameFilter,
      variables: {
        input: {
          cursor,
          filter: {
            companyIds: uidFilter ? [uidFilter] : undefined,
            includeDeleted: true,
          },
        },
      },
    })

  const [{ data: searchData, fetching: isFetchingSearch }] =
    useSearchCompanyQuery({
      pause: !nameFilter,
      variables: {
        input: {
          query: nameFilter,
        },
      },
    })

  // the first argument is the last changed value, other values are undefined
  const handleValuesChange = ({ name, uid }: { uid: string; name: string }) => {
    if (name !== undefined) {
      form.setFieldsValue({ uid: '' })
      debouncedNameFilter(name)
    }
    if (uid !== undefined) {
      form.setFieldsValue({ name: '' })
      debouncedUidFilter(uid)
    }
  }

  const handleOpen = (company?: CompanyFragment) => {
    setIsOpen(true)
    setSelectedCompany(company)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedCompany(undefined)
  }

  const handleCreate = (allValues: CreateCompanyInput) => {
    createCompany({
      input: allValues,
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Company created')
        handleClose()
      }
    })
  }

  const handleDelete = () => {
    if (!selectedCompany?.id) return

    deleteCompany({
      input: {
        companyId: selectedCompany.id,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Company deleted')
        handleClose()
      }
    })
  }

  const handleUpdate = (allValues: UpdateCompanyInput) => {
    updateCompany({
      input: {
        companyId: selectedCompany?.id,
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Company updated')
    })
  }

  const handleExport = () => {
    exportCompanies().then(({ data, error }) => {
      if (error) message.error(error.message)
      const url = data?.createCompanyExport
      if (url) {
        window.location.assign(url)
      }
    })
  }

  return (
    <div className="admin-companies-list">
      <Space>
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleOpen()}
          type="primary"
        >
          Create new company
        </Button>

        <Form
          className="search-form"
          form={form}
          layout="inline"
          onValuesChange={handleValuesChange}
        >
          <Form.Item name="uid">
            <Search allowClear placeholder="Search by uid" />
          </Form.Item>
          <div className="divider">or</div>
          <Form.Item name="name">
            <Search allowClear placeholder="Search by name" />
          </Form.Item>
        </Form>

        <Button
          icon={<DownloadOutlined />}
          loading={isExporting}
          onClick={() => handleExport()}
          type="ghost"
        >
          Export
        </Button>
      </Space>

      <Table
        className="companies-table"
        dataSource={
          nameFilter
            ? searchData?.searchCompany || []
            : companiesData?.companies.items || []
        }
        loading={isFetchingCompanies || isFetchingSearch}
        pagination={false}
        rowClassName={(item) => (item.deletedAt ? 'row-deleted' : 'undefined')}
        rowKey={(item) => item.id}
      >
        <Column dataIndex="name" key="name" title="Name" />
        <Column dataIndex="id" key="id" title="Id" />
        <Column
          key="action"
          render={(_, record: CompanyFragment) =>
            !record.deletedAt ? (
              <Space size="middle">
                <Button onClick={() => handleOpen(record)} type="primary">
                  Edit
                </Button>
              </Space>
            ) : (
              'Deleted'
            )
          }
          title="Action"
        />
      </Table>

      <Space>
        {!nameFilter && cursorHistory.length ? (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              const [prevCursor, ...remainingHistory] = cursorHistory
              setCursorHistory(remainingHistory)
              setCursor(prevCursor)
            }}
            type="text"
          />
        ) : null}

        {!nameFilter && companiesData?.companies.cursor ? (
          <Button
            icon={<ArrowRightOutlined />}
            onClick={() => {
              setCursorHistory((v) => [cursor, ...v])
              setCursor(companiesData.companies.cursor ?? null)
            }}
            type="text"
          />
        ) : null}
      </Space>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={handleClose}
        visible={isOpen}
      >
        <>
          <h1>{selectedCompany ? 'Update' : 'Create'} Company</h1>
          <CompanyForm
            countries={countries}
            // While creating a company, not all props can be set
            filterByKeys={
              !selectedCompany
                ? [
                    'country',
                    'crmId',
                    'employeeCount',
                    'logoUrl',
                    'name',
                    'programContentId',
                    'tags',
                    'websiteUrl',
                  ]
                : undefined
            }
            initialValues={selectedCompany}
            isLoading={
              isCreatingCompany || isDeletingCompany || isUpdatingCompany
            }
            onCreate={handleCreate}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            programs={programs}
            type={selectedCompany ? 'update' : 'create'}
          />
        </>
      </Drawer>
    </div>
  )
}

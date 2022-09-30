import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Select, Spin } from 'antd'
import _debounce from 'lodash.debounce'
import React, { useEffect, useRef, useState } from 'react'

import {
  useCompaniesQuery,
  useSearchCompanyQuery,
} from '../../services/lfca-backend'
import styles from './styles.module.less'

interface CompanyIdSearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onNavigateToCompany?: (companyId: string) => void
}

export const CompanyIdSearchInput = ({
  onChange,
  onNavigateToCompany,
  value,
}: CompanyIdSearchInputProps) => {
  const [initialValue] = useState<string | undefined>(value)
  const [internalValue, setInternalValue] = useState<{
    label: string
    value: string
  }>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [nameFilter, setNameFilter] = useState<string>('')

  const debouncedNameFilter = useRef(
    _debounce(async (value) => {
      setNameFilter(value)
    }, 500)
  ).current

  const [{ data: searchData, fetching: isFetchingSearch }] =
    useSearchCompanyQuery({
      pause: !nameFilter,
      variables: {
        input: {
          query: nameFilter,
        },
      },
    })

  const [{ data: initialData, fetching: isFetchingInitialData }] =
    useCompaniesQuery({
      pause: !initialValue,
      variables: {
        input: {
          filter: {
            companyIds: [initialValue as string],
          },
        },
      },
    })

  useEffect(() => {
    setOptions(
      searchData?.searchCompany.map((c) => ({
        label: c.name || '',
        value: c.id,
      })) || []
    )
  }, [searchData])

  const handleSearch = (newValue: string) => {
    if (newValue) {
      debouncedNameFilter(newValue)
    } else {
      setOptions([])
    }
  }

  const selectedName = initialData?.companies.items[0]?.name || ''

  return (
    <div className="company-id-search-input">
      <Select
        defaultActiveFirstOption={false}
        filterOption={false}
        labelInValue
        loading={isFetchingInitialData}
        notFoundContent={isFetchingSearch ? <Spin size="small" /> : null}
        onChange={(value) => {
          setInternalValue(value)
          onChange && onChange(value.value)
        }}
        onSearch={handleSearch}
        options={options}
        placeholder="LFCA"
        showSearch
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={
          !internalValue && initialValue
            ? {
                label: selectedName,
                value: initialValue,
              }
            : internalValue
        }
      />
      {onNavigateToCompany ? (
        <Button
          disabled={!value || !selectedName}
          icon={<ArrowRightOutlined />}
          onClick={() => value && onNavigateToCompany(value)}
          type="text"
        />
      ) : null}
    </div>
  )
}

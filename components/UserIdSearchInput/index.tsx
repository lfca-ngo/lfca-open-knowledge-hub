import { Select, Spin } from 'antd'
import _debounce from 'lodash.debounce'
import React, { useEffect, useRef, useState } from 'react'

import { useSearchUserQuery, useUsersQuery } from '../../services/lfca-backend'

interface UserIdSearchInputProps {
  onChange?: (value: string) => void
  value?: string
}

export const UserIdSearchInput = ({
  onChange,
  value,
}: UserIdSearchInputProps) => {
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

  const [{ data: searchData, fetching: isFetchingSearch }] = useSearchUserQuery(
    {
      pause: !nameFilter,
      variables: {
        input: {
          query: nameFilter,
        },
      },
    }
  )

  const [{ data: initialData, fetching: isFetchingInitialData }] =
    useUsersQuery({
      pause: !initialValue,
      variables: {
        input: {
          filter: {
            userIds: [initialValue as string],
          },
        },
      },
    })

  useEffect(() => {
    setOptions(
      searchData?.searchUser.map((c) => ({
        label: `${c.firstName} ${c.lastName}` || '',
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

  return (
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
      showSearch
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value={
        !internalValue && initialValue
          ? {
              label:
                `${initialData?.users.items[0].firstName} ${initialData?.users.items[0].lastName}` ||
                '',
              value: initialValue,
            }
          : internalValue
      }
    />
  )
}

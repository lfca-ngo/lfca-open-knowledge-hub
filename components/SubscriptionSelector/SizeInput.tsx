import { LoadingOutlined } from '@ant-design/icons'
import { InputNumber, InputNumberProps, message } from 'antd'
import { valueType } from 'antd/lib/statistic/utils'
import _debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'

import { useUser } from '../../hooks/user'
import { useUpdateCompanyMutation } from '../../services/lfca-backend'
import styles from './styles.module.less'

export const SizeInput = ({
  optionalInputNumberProps,
  style,
}: {
  optionalInputNumberProps?: Omit<InputNumberProps, 'value' | 'onChange'>
  style?: React.CSSProperties
}) => {
  const [{ fetching }, updateCompany] = useUpdateCompanyMutation()
  const [fundSize, setFundSize] = useState<number | null>()
  const [teamSize, setTeamSize] = useState<number | null>()
  const { company, isVentureCapitalCompany } = useUser()

  const debouncedTeamSizeInput = useRef(
    _debounce(async (value) => {
      updateCompany({
        input: {
          employeeCount: value,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        message.success('Changed company size')
      })
    }, 500)
  ).current

  const debouncedFundSizeInput = useRef(
    _debounce(async (value) => {
      updateCompany({
        input: {
          fundSize: value,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        message.success('Changed fund size')
      })
    }, 500)
  ).current

  const handleTeamSizeChange = (val: valueType | null) => {
    debouncedTeamSizeInput(val)
  }

  const handleFundSizeChange = (val: valueType | null) => {
    debouncedFundSizeInput(val)
  }

  // update employee count
  useEffect(() => {
    if (company?.employeeCount) {
      setTeamSize(company?.employeeCount)
    }
  }, [company?.employeeCount])

  // update fund count
  useEffect(() => {
    if (company?.fundSize) {
      setFundSize(company?.fundSize)
    }
  }, [company?.fundSize])

  return (
    <div className={styles['size-input']} style={style}>
      {isVentureCapitalCompany ? (
        <>
          <span className="size-input-label">
            {fetching && <LoadingOutlined />} Fundsize
          </span>
          <InputNumber
            onChange={handleFundSizeChange}
            value={fundSize}
            {...optionalInputNumberProps}
          />
        </>
      ) : (
        <>
          <span className="size-input-label">
            {fetching && <LoadingOutlined />} Team
          </span>
          <InputNumber
            onChange={handleTeamSizeChange}
            value={teamSize}
            {...optionalInputNumberProps}
          />
        </>
      )}
    </div>
  )
}

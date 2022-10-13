import { Checkbox, Input, InputNumber } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React from 'react'

import styles from './styles.module.less'

interface RecurrenceRuleInputProps {
  value?: string
  onChange?: (value: string | null) => void
}

export const RecurrenceRuleInput = ({
  onChange,
  value,
}: RecurrenceRuleInputProps) => {
  // If a value for COUNT is present, the event is NOT infinite
  const existingInterval = getNumberFromValueString(value, 'INTERVAL')
  const existingCount = getNumberFromValueString(value, 'COUNT')

  const onIntervalChange = (newInterval: number | null) => {
    onChange?.(createValueString({ interval: newInterval }))
  }

  const onCountChange = (newCount: number | null) => {
    onChange?.(createValueString({ count: newCount }))
  }

  const onInfiniteChange = (e: CheckboxChangeEvent) => {
    onChange?.(
      createValueString({
        count: e.target.checked ? null : existingCount || 1,
      })
    )
  }

  return (
    <>
      <Input.Group className={styles.recurrenceInputGroup}>
        <span>every </span>
        <InputNumber
          inputMode="numeric"
          onChange={onIntervalChange}
          pattern="[0-9]*"
          placeholder="4"
          type="number"
          value={existingInterval}
        />
        <span>{` week${
          existingInterval && existingInterval > 1 ? 's' : ''
        }`}</span>

        {existingCount ? (
          <>
            <span> for </span>
            <InputNumber
              inputMode="numeric"
              onChange={onCountChange}
              pattern="[0-9]*"
              placeholder="10"
              type="number"
              value={existingCount}
            />
            <span> times.</span>
          </>
        ) : null}
      </Input.Group>

      <Checkbox checked={!existingCount} onChange={onInfiniteChange}>
        Repeats indefinitely?
      </Checkbox>
    </>
  )

  function getNumberFromValueString(
    value: string | undefined,
    prop: string
  ): number | null {
    const strVal = value?.split(`${prop}=`).pop()?.split(';')[0]
    return strVal ? parseInt(strVal, 10) || null : null
  }

  function createValueString({
    count,
    interval,
  }: {
    interval?: number | null
    count?: number | null
  }): string | null {
    if (interval === null) return null

    return `FREQ=WEEKLY;INTERVAL=${
      interval || getNumberFromValueString(value, 'INTERVAL') || 1
    };${
      (existingCount && count !== null) || count
        ? `COUNT=${count || existingCount || 1};`
        : ''
    }WKST=MO`
  }
}

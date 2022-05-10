import React from "react"
import { HousingInput } from "./HousingInput"
import { FixedInput } from "./FixedInput"
import { ElectricityInput } from "./ElectricityInput"
import { Radio, InputNumber } from "antd"

const renderSwitch = (activeQuestion: any, updateAnswer: any) => {
  const { type, options, initialValue, currency } = activeQuestion

  let initValue
  try {
    initValue = JSON.parse(initialValue)
  } catch (error) {
    initValue = ""
  }

  const currencyRegex = new RegExp(`\\${currency}\\s?|(,*)`, "g")

  switch (type) {
    case "energy":
    case "radio":
      return (
        <Radio.Group onChange={(e) => updateAnswer(e.target.value)}>
          {options.map((option: any, i: any) => (
            <Radio key={`option-${i}`} value={option.value}>
              {option.title}
            </Radio>
          ))}
        </Radio.Group>
      )
    case "inputNumber":
      return (
        <InputNumber
          placeholder={initValue}
          min={0}
          onChange={(val) => updateAnswer(val)}
        />
      )
    case "inputCurrency":
      return (
        <InputNumber
          formatter={(value) =>
            `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          min={0}
          parser={(value: any) => value.replace(currencyRegex, "")}
          onChange={(val) => updateAnswer(val)}
          placeholder={initValue}
        />
      )
    case "housing":
      return (
        <HousingInput options={options} onChange={(val) => updateAnswer(val)} />
      )
    case "electricity":
      return (
        <ElectricityInput
          options={options}
          onChange={(val) => updateAnswer(val)}
        />
      )
    case "fixed":
      return (
        <FixedInput options={options} onChange={(val: any) => updateAnswer(val)} />
      )
    default:
      return null
  }
}

export default renderSwitch

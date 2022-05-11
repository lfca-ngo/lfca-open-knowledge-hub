import React from "react"
import { HousingInput } from "./HousingInput"
import { FixedInput } from "./FixedInput"
import { ElectricityInput } from "./ElectricityInput"
import { Radio, InputNumber } from "antd"

const renderSwitch = (activeQuestion: any) => {
  const { type, options, initialValue, currency } = activeQuestion

  let placeholderValue
  try {
    // try to parse as int
    placeholderValue = parseInt(initialValue)
    // if it fails, try to parse as json
    if (!placeholderValue) {
      placeholderValue = JSON.parse(`${initialValue}`)
    }
  } catch (error) {
    // if it fails, set to undefined
    placeholderValue = ""
  }

  const currencyRegex = new RegExp(`\\${currency}\\s?|(,*)`, "g")

  switch (type) {
    case "energy":
    case "radio":
      return (
        <Radio.Group >
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
          placeholder={placeholderValue || 0}
          min={0}
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
          placeholder={placeholderValue}
        />
      )
    case "housing":
      return (
        <HousingInput options={options} placeholderValue={placeholderValue} />
      )
    case "electricity":
      return (
        <ElectricityInput
          options={options}
        />
      )
    case "fixed":
      return (
        <FixedInput options={options} />
      )
    default:
      return null
  }
}

export default renderSwitch

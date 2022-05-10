import React, { useState } from 'react';
import { InputNumber, Select } from 'antd';

const { Option } = Select;

interface ElectricityValue {
  amount?: number;
  type?: string;
}

interface ElectricityInputProps {
  value?: ElectricityValue;
  onChange?: (value: ElectricityValue) => void;
  options?: any;
}

export const ElectricityInput: React.FC<ElectricityInputProps> = ({ value = {}, options, onChange }) => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');

  const triggerChange = (changedValue: { amount?: number; type?: string }) => {
    onChange?.({ amount, type, ...value, ...changedValue });
  };

  const onAmountChange = (val: number) => {
    triggerChange({ amount: val });
  };

  const onTypeChange = (val: string) => {
    triggerChange({ type: val });
  };

  return (
    <span className="electricity-input" >
      <div className="line">
        <span>We are </span>
        <InputNumber
          type="text"
          placeholder="2"
          min={1}
          value={value && value.amount}
          onChange={onAmountChange}
          style={{ width: "100px", marginRight: "6px" }}
        />
        people in our household.
      </div>
      <div className="line">
        <span>My electricity is </span>
        <Select
          onSelect={onTypeChange}
          value={value && value.type}
          placeholder="Please select your electricity type"
          style={{ maxWidth: "280px", marginRight: "6px" }}
        >
          {options.map((option: any, i: number) => (
            <Option key={`option-${i}`} value={option.value}>
              {option.title}
            </Option>
          ))}
        </Select>
        <span>.</span>
      </div>
    </span>
  );
};
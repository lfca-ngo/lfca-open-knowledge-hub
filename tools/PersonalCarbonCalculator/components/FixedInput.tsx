import React, { useEffect } from "react"

export const FixedInput = ({ value = {}, options, onChange }: { value?: any, options: any, onChange?: any }) => {

  const triggerChange = (changedValue: any) => {
    onChange?.({ ...value, ...changedValue });
  };

  useEffect(() => triggerChange(options[0]), [])

  return <span className="fixed-input" />
};
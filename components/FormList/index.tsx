require('./styles.less')

import { Button, Form } from 'antd'
import { ReactNode } from 'react'

interface RenderInputProps {
  onRemove: () => void
}

interface FormListProps {
  addButtonIcon?: ReactNode
  addButtonText?: string
  className?: string
  label?: ReactNode
  maxItems?: number
  name: string
  renderInput: (props: RenderInputProps) => ReactNode
}

export const FormList = ({
  addButtonIcon,
  addButtonText,
  className,
  label,
  maxItems,
  name,
  renderInput,
}: FormListProps) => {
  const maxReachedMessage = maxItems ? `Max ${maxItems} items allowed` : ''

  return (
    <Form.Item className={className} dependencies={[name]}>
      {({ getFieldValue }) => {
        return (
          <Form.List
            name={name}
            rules={[
              {
                validator: async (_: object, values?: string[]) => {
                  if (maxItems && values && values.length > maxItems) {
                    return Promise.reject(new Error(maxReachedMessage))
                  }

                  if (values && values.some((v) => !v)) {
                    return Promise.reject(
                      new Error('Please remove empty items')
                    )
                  }
                },
              },
            ]}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            validateTrigger="onSubmit"
          >
            {(fields, { add, remove }, { errors }) => {
              const disabled =
                maxItems && fields.length >= maxItems ? true : false

              return (
                <div className="form-list">
                  <div className="label-with-button">
                    <div className="label">{label}</div>
                    {maxItems && fields.length >= maxItems ? (
                      <div className="max-reached-message">
                        {maxReachedMessage}
                      </div>
                    ) : (
                      <Button
                        disabled={disabled}
                        icon={addButtonIcon}
                        onClick={() => {
                          // Do not allow a new item if there is a previous one that is empty
                          const val = getFieldValue(name)
                          if (
                            Array.isArray(val) &&
                            val.length &&
                            !val[val.length - 1]
                          )
                            return
                          add()
                        }}
                        size="small"
                        type="dashed"
                      >
                        {addButtonText}
                      </Button>
                    )}
                  </div>
                  {fields.map((field) => (
                    <Form.Item
                      {...field}
                      className="item-sm"
                      key={field.key}
                      required={false}
                    >
                      {renderInput({ onRemove: () => remove(field.name) })}
                    </Form.Item>
                  ))}
                  <Form.ErrorList errors={errors} />
                </div>
              )
            }}
          </Form.List>
        )
      }}
    </Form.Item>
  )
}

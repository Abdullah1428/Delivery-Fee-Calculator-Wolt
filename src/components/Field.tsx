import React from 'react'
import { FormErrors, FormCtxt, FormContext, FormValues } from './Form'

export interface Validation {
  rule: (values: FormValues, fieldName: string, args: any) => string
  args?: any
}

export interface FieldProps {
  id: string
  label?: string
  placeholder?: string
  type: string
  value?: number
  validation?: Validation
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
}) => {
  const getError = (errors: FormErrors): string => (errors ? errors[id] : '')

  const getEditorStyle = (errors: FormErrors): any =>
    getError(errors) ? { borderColor: 'red' } : {}

  return (
    <FormContext.Consumer>
      {(context: FormCtxt) => (
        <div className='form-group'>
          {label && (
            <label className='form-label' htmlFor={id}>
              {label.toUpperCase()}
            </label>
          )}

          {type!.toLowerCase() === 'number' && (
            <input
              data-test='number-field'
              step={'any'}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              style={getEditorStyle(context.errors)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                context.setValues({ [id]: Number(e.currentTarget.value) })
              }
              onBlur={() => context.validate(id)}
              className='form-control'
            />
          )}

          {type!.toLowerCase() === 'datetime-local' && (
            <input
              data-test='date-field'
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              style={getEditorStyle(context.errors)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                context.setValues({
                  [id]: new Date(e.currentTarget.value),
                })
              }
              onBlur={() => context.validate(id)}
              className='form-control'
            />
          )}
          {getError(context.errors) && (
            <div style={{ color: 'red', fontSize: '80%' }}>
              <p>{getError(context.errors)}</p>
            </div>
          )}
        </div>
      )}
    </FormContext.Consumer>
  )
}

export default Field

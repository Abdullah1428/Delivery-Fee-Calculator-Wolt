import React, { useState } from 'react'
import useCalculator from '../Hooks/useCalculator'
import { FieldProps } from './Field'

interface FormProps {
  fields: FormFields
  Fields?: React.ReactNode
}

export interface FormValues {
  [key: string]: number | Date
}

export interface FormErrors {
  [key: string]: string
}

export interface FormState {
  values: FormValues
  errors: FormErrors
}

export interface FormCtxt extends FormState {
  setValues: (values: FormValues) => void
  validate: (fieldName: string) => void
}

export const FormContext = React.createContext<FormCtxt>({
  values: {},
  errors: {},
  setValues: () => console.log('hello'),
  validate: () => console.log('hello'),
})

export interface FormFields {
  [key: string]: FieldProps
}

export const required = (values: FormValues, fieldName: string): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === 0
    ? 'This must be populated'
    : ''

const Form: React.FC<FormProps> = (props: FormProps) => {
  const [errors, setFormErrors] = useState<FormErrors>({})
  const [values, setFormValues] = useState<FormValues>({})

  const { deliveryPrice, handleCalculation } = useCalculator(values)

  const setValues = (v: FormValues) => {
    setFormValues({ ...values, ...v })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    context.validate('cart')
    context.validate('distance')
    context.validate('amount')
    context.validate('time')

    if (Errors(errors)) {
      alert('Enter valid values to calculate')
    } else {
      handleCalculation()
    }
  }

  const Errors = (errors: FormErrors) => {
    let error: boolean = false
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        error = true
      }
    })
    return error
  }

  const validate = (fieldName: string): string => {
    let newError: string = ''

    if (props.fields[fieldName] && props.fields[fieldName].validation) {
      newError = props.fields[fieldName].validation!.rule(
        values,
        fieldName,
        props.fields[fieldName].validation!.args
      )
    }
    errors[fieldName] = newError
    setFormErrors({ ...errors, [fieldName]: newError })

    return newError
  }

  const context: FormCtxt = {
    values,
    errors,
    setValues: setValues,
    validate: validate,
  }

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleSubmit}>
        <div className='container row g-4'>
          {props.Fields}
          <div className='form-group'>
            <button
              data-test='button-submit'
              type='submit'
              disabled={Errors(errors)}
              className='btn btn-primary'
            >
              {'Calculate delivery price'}
            </button>
          </div>

          <div className='alert alert-info'>
            <p data-test='final-price'>{`Delivery Price: ${deliveryPrice}€`}</p>
          </div>
        </div>
      </form>
    </FormContext.Provider>
  )
}

export default Form

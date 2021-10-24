import React from 'react'
import Form, { FormFields, required } from '../components/Form'
import Field from '../components/Field'

const DeliveryCalculator: React.FC = () => {
  const fields: FormFields = {
    cart: {
      id: 'cart',
      label: 'Cart Value',
      placeholder: 'cart',
      type: 'number',
      validation: { rule: required },
    },
    distance: {
      id: 'distance',
      label: 'Delivery Distance',
      placeholder: 'distance in meters',
      type: 'number',
      validation: { rule: required },
    },
    amount: {
      id: 'amount',
      label: 'Amount of Items',
      placeholder: 'amount in €',
      type: 'number',
      validation: { rule: required },
    },
    time: {
      id: 'time',
      label: 'Time',
      placeholder: 'time',
      type: 'datetime-local',
      validation: { rule: required },
    },
  }

  return (
    <Form
      fields={fields}
      Fields={
        <>
          <Field {...fields.cart} />
          <Field {...fields.distance} />
          <Field {...fields.amount} />
          <Field {...fields.time} />
        </>
      }
    />
  )
}

export default DeliveryCalculator

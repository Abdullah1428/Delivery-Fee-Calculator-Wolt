import React, { useState } from 'react'

// custom hook to calculate fee delivery with all constraints according
// to the pdf provided
import useCalculator from '../Hooks/useCalculator'
// button component

interface InputState {
  cartValue: number
  deliveryDistance: number
  amount: number
  time: Date
}

interface FormErrors {
  [key: string]: string
}

const DeliveryCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InputState>({
    cartValue: 0,
    deliveryDistance: 0,
    amount: 0,
    time: new Date(),
  })

  // const [deliveryPrice, handleCalculation] = useCalculator(
  //   inputs.cartValue,
  //   inputs.deliveryDistance,
  //   inputs.amount,
  //   Number(inputs.time)
  // )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault()
    //calculatePrice()
  }

  return (
    <form className='input-form'>
      <h4>Cart Value</h4>
      <input
        type='number'
        placeholder='cart value'
        className='input-box'
        value={inputs.cartValue}
        name='cartValue'
        onChange={handleInputChange}
      />

      <h4>Delivery Distance</h4>
      <input
        type='number'
        placeholder='delivery distance'
        className='input-box'
        value={inputs.deliveryDistance}
        name='deliveryDistance'
        onChange={handleInputChange}
      />

      <h4>Amount of Items</h4>
      <input
        type='number'
        placeholder='amount of items'
        className='input-box'
        value={inputs.amount}
        name='amount'
        onChange={handleInputChange}
      />

      <h4>Time</h4>
      <input
        type='datetime-local'
        placeholder='time'
        className='input-box'
        value={inputs.time.toString()}
        onChange={handleInputChange}
        name='time'
      />

      <h3>{`Delivery Price: ${0}€`}</h3>
    </form>
  )
}

export default DeliveryCalculator

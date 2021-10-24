import { renderHook, act } from '@testing-library/react-hooks'
import { FormValues } from '../components/Form'

import useCalculator from './useCalculator'

describe('useCalculator custom hook tests', () => {
  it('should return 2 delivery price', () => {
    const values: FormValues = {
      cart: 10,
      distance: 1000,
      amount: 4,
      time: new Date(),
    }

    const { result } = renderHook(() => useCalculator(values))

    act(() => {
      result.current.handleCalculation()
    })

    expect(result.current.deliveryPrice).toEqual(2)
  })

  it('should return 8.1 delivery price', () => {
    const values: FormValues = {
      cart: 8.9,
      distance: 1501,
      amount: 10,
      time: new Date(),
    }

    const { result } = renderHook(() => useCalculator(values))

    act(() => {
      result.current.handleCalculation()
    })

    expect(result.current.deliveryPrice).toEqual(8.1)
  })

  it('should return result with 1.1x due to rush hour time', () => {
    const values: FormValues = {
      cart: 8.9,
      distance: 1501,
      amount: 10,
      time: 1634918860000, // milliseconds = Friday, October 22, 2021 16:07:40
    }

    const { result } = renderHook(() => useCalculator(values))

    act(() => {
      result.current.handleCalculation()
    })

    expect(result.current.deliveryPrice).toEqual(8.1 * 1.1)
  })
})

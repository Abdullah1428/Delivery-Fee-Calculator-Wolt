import { useState } from 'react'
import { FormValues } from '../components/Form'

const useCalculator = (values: FormValues) => {
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const handleCalculation = (): void => {
    // calculator fee delivery logic

    if (values.cart >= 100 || values.cart <= 0) {
      setDeliveryPrice(0)
      return
    }

    const surCharge: number = calculateCartSurCharge(Number(values.cart))
    const distanceFee: number = calculateDistanceFee(Number(values.distance))
    const amountSurCharge: number = calculateAmountSurCharge(
      Number(values.amount)
    )
    const finalPrice: number = calculateRushHourCharge(
      new Date(values.time),
      distanceFee + surCharge + amountSurCharge
    )

    if (finalPrice > 15) {
      setDeliveryPrice(15)
      return
    } else {
      setDeliveryPrice(finalPrice)
      return
    }
  }

  return { deliveryPrice, handleCalculation } // as const for typehint the array
}

/*
 * calculateCartSturcharge: number
 * method to calculate the surcharge amount if cart value is between
 * 0 and 10.
 */
const calculateCartSurCharge = (cartValue: number): number => {
  let surcharge: number = 0
  if (cartValue > 0 && cartValue < 10) {
    surcharge = 10 - cartValue
  }
  return Number(parseFloat(surcharge.toString()).toPrecision(2)) // precision upto 2 decimat points
}

/*
 * calculateDistanceFee: number
 * method to calculate the delivery fee on the basis of distance
 * given in meters. For first 1000 meters or 1km its 2 and for
 * additional 500 its 1 along with base 2.
 */
const calculateDistanceFee = (deliveryDistance: number): number => {
  return deliveryDistance > 1000
    ? Math.ceil(deliveryDistance / 500)
    : deliveryDistance > 0
    ? 2
    : 0
}

/*
 * calculateAmountSurCharge: number
 * method to calculate the surcharge amount if amount of
 * items ordered are more then 4. The surchage is 50 cents for
 * each additional item after 4.
 */
const calculateAmountSurCharge = (amount: number): number => {
  return amount < 5 ? 0 : (amount - 4) * 0.5
}

const calculateRushHourCharge = (time: Date, totalFee: number): number => {
  let finalDeliveryFee = totalFee
  const utcTime = new Date(time)

  if (utcTime.getUTCDay() === 5) {
    // so total minutes in a 24 hr day are 1440 mins.
    // the rush hours are 3pm to 7pm on friday so we need to check if user
    // selected time is in between those hours

    const rushHourStartingMinutes: number = 15 * 60 + 0 // starting time is 3 pm = 900 min
    const rushHoursEndingMinutes: number = 19 * 60 + 0 // ending time is 7 pm = 1140 min

    const selectedTime = utcTime.getHours() * 60 + utcTime.getMinutes() // get minutes for selected time

    if (
      rushHourStartingMinutes <= selectedTime &&
      selectedTime <= rushHoursEndingMinutes
    ) {
      finalDeliveryFee = 1.1 * finalDeliveryFee
    }
  }

  return finalDeliveryFee
}

export default useCalculator

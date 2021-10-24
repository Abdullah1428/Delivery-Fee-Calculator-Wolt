import * as ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/dom'

import Form from '../Form'

describe('Form Component tests', () => {
  const fields = {
    cart: {
      id: 'cart',
      label: 'Cart Value',
      placeholder: 'cart',
      type: 'number',
    },
    distance: {
      id: 'distance',
      label: 'Delivery Distance',
      placeholder: 'distance in meters',
      type: 'number',
    },
    amount: {
      id: 'amount',
      label: 'Amount of Items',
      placeholder: 'amount in €',
      type: 'number',
    },
    time: {
      id: 'time',
      label: 'Time',
      placeholder: 'time',
      type: 'datetime-local',
    },
  }

  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<Form fields={fields} />, container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('Renders correctly Form component with price field and button', () => {
    expect(
      container.querySelector("[data-test='final-price']")
    ).toBeInTheDocument()

    expect(
      container.querySelector("[data-test='button-submit']")
    ).toBeInTheDocument()
  })

  it('Checking if handleSubmit is called', () => {
    const button = container.querySelector("[data-test='button-submit']")!

    fireEvent.click(button)
  })
})

import * as ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/dom'

import Field from '../Field'

describe('Field Component tests', () => {
  const field = {
    cart: {
      id: 'cart',
      label: 'Cart Value',
      placeholder: 'Cart Value',
      type: 'number',
      value: 10,
    },
    time: {
      id: 'cart',
      label: 'Cart Value',
      placeholder: 'Cart Value',
      type: 'datetime-local',
      value: new Date().getTime(),
    },
  }

  let container: HTMLDivElement
  let container2: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container2 = document.createElement('div')
    document.body.appendChild(container)
    document.body.appendChild(container2)
    ReactDOM.render(<Field {...field.cart} />, container)
    ReactDOM.render(<Field {...field.time} />, container2)
  })

  afterEach(() => {
    document.body.removeChild(container)
    document.body.removeChild(container2)
    container.remove()
    container2.remove()
  })

  it('Renders correctly Field component with field props', () => {
    expect(
      container.querySelector("[data-test='number-field']")
    ).toBeInTheDocument()

    expect(
      container2.querySelector("[data-test='date-field']")
    ).toBeInTheDocument()
  })
})

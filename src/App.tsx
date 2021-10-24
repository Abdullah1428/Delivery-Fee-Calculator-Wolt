import './App.css'
import DeliveryCalculator from './calculator/DeliveryCalculator'

function App() {
  return (
    <main>
      <div className='container mt-2'>
        <h1>Delivery Fee Calculator - Wolt Assignment</h1>
        <div className='col-lg-4 col-offset-6'>
          <DeliveryCalculator />
        </div>
      </div>
    </main>
  )
}

export default App

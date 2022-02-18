import React from 'react'
import Dropdown from './components/Dropdown'

function App() {
  return (
    <div className="wrapper">
      <div className="title">
        DROPDOWN
      </div>
      <Dropdown
        title={'Поиск валют'}
        items={[
          { id: 0, name: 'Bitcoin' },
          { id: 1, name: 'Ripple' },
          { id: 2, name: 'Ethereum' },
          { id: 3, name: 'Litecoin' },
          { id: 4, name: 'Bitcoin Cach/BBC' },
          { id: 5, name: 'EOS' },
          { id: 6, name: 'Binance Coin' },
          { id: 7, name: 'Tether' },
        ]}
        multiSelect={true}
      />      
    </div>
  )
}

export default App

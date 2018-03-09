import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

class App extends React.Component {
  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' age={500} address='sdfsd' />
          {
            //   want to pass anything else than string we need to pass in curly braces
          }
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
}

export default App

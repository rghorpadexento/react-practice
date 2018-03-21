import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import samplefishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  addFish = fish => {
    // 1 . take copy of existing state for avoiding muatation
    const fishes = { ...this.state.fishes }
    // 2. add new fish to variable
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: samplefishes })
  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' age={500} address='sdfsd' />
          {
            //   want to pass anything else than string we need to pass in curly braces
          }
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map(key => (
              <Fish fishDetails={this.state.fishes[key]} key={key} />
            ))}
          </ul>

        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
}

export default App

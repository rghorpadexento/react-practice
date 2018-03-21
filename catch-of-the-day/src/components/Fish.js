import React from 'react'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  render () {
    const { image, name, desc, price, status } = this.props.fishDetails
    const isAvailable = status === 'available'
    return (
      <li className='menu-fish'>
        <img src={image} alt='fish image' />
        <h3 className='fish-name'>
          {name}
          <span class='price'>{formatPrice(price)}</span>

        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable}>Add to Order</button>
      </li>
    )
  }
}

export default Fish

import React from 'react'

class AddFishForm extends React.Component {
  createFish = e => {
    e.preventDefault()
    console.log('making fish')
  }

  render () {
    return (
      <form className='fish-edit' onSubmit={this.createFish}>
        <input type='text' name='name' placeholder='Name' />
        <input type='text' name='price' placeholder='Price' />
        <select type='text' name='status' placeholder='Status'>
          <option value='available'>Fresh</option>
          <option value='unavailable'>Sold out</option>
        </select>
        <textarea type='text' name='desc' placeholder='Desc' />
        <input type='text' name='image' placeholder='Image' />
        <button type='submit'>Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm

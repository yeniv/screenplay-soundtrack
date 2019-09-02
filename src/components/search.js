import React, { Component } from 'react'

class Search extends Component {
  constructor(props) {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.handleSearchChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSearchSubmit()
  }

  render() {
    return (
      <div className='search'>
        <form
          onSubmit={this.handleSubmit}>
          <label>
            <input
              className='search-input'
              type='text'
              value={this.props.value}
              onChange={this.handleChange} />
          </label>
          <input className='search-button' type='submit' value='Search' />
        </form>
      </div>
    )
  }
}

export default Search

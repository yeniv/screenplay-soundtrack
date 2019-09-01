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
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.props.value}
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default Search

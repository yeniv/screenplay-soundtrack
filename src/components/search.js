import React, { Component } from 'react'

class Search extends Component {
  constructor(props) {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.props.handleSearchChange(e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSearchSubmit(this.value)
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

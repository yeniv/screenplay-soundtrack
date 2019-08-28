import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>{ this.props.title }</h1>
        <h3>{ this.props.description }</h3>
      </div>
    )
  }
}

export default Header

import React, { Component } from 'react'

class Song extends Component {
  render() {
    return (
      <div className='song'>
        <p>I'm a Song component!</p>
        <p>Test: {this.props.value}</p>
      </div>
    )
  }
}

export default Song

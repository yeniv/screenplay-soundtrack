import React, { Component } from 'react'

class Tweet extends Component {
  render() {
    return (
      <div className='tweet'>
        <p>I'm a Tweet component!</p>
        <p>Test: {this.props.value}</p>
      </div>
    )
  }
}

export default Tweet

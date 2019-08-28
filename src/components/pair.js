import React, { Component } from 'react'
import Tweet from './tweet.js'
import Song from './song.js'

class Pair extends Component {
  render() {
    return (
      <div className='pair'>
        <Tweet value={this.props.value} />
        <Song value={this.props.value} />
      </div>
    )
  }
}

export default Pair

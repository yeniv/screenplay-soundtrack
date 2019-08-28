import React, { Component } from 'react'
import Pair from './pair.js'

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        <Pair value={this.props.value}/>
      </div>
    )
  }
}

export default Playlist

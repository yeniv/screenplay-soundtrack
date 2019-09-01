import React, { Component } from 'react'
import Song from './song.js'

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        <Song value={this.props.value}/>
      </div>
    )
  }
}

export default Playlist

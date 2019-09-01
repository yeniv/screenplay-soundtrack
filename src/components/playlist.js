import React, { Component } from 'react'
import Song from './song.js'

class Playlist extends Component {
  render() {
    // const songs = this.props.value
    // console.log(songs)

    return (
      <div className='playlist'>
        <Song
          value={this.props.value}/>
      </div>
    )
  }
}

export default Playlist

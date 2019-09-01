import React, { Component } from 'react'
import Song from './song.js'

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        {
          this.props.songs.map((song, index) => {
            return <Song value={song} key={index}/>
          })
        }
      </div>
    )
  }
}

export default Playlist

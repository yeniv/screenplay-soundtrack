import React, { Component } from 'react'
import SongPlayer from './songPlayer.js'
import './playlist.css'

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        {
          this.props.songs.map((song, index) => {
            return <SongPlayer value={song} key={index} />
          })
        }
      </div>
    )
  }
}

export default Playlist

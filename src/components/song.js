import React, { Component } from 'react'

import './song.css'

class Song extends Component {
  render() {
    const song = this.props.value
    return (
      <div className='song'>
        <img
          src={song.albumCover}
          alt=""/>
        <div className="song-info">
          <p>Title: {song.title}</p>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.albumTitle}</p>
        </div>
      </div>
    )
  }
}

export default Song

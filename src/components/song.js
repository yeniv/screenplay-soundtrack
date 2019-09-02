import React, { Component } from 'react'

class Song extends Component {
  render() {
    const song = this.props.value
    return (
      <div className='song'>
        <img
          src={song.albumCover}
          alt=""/>
        <div className="song-info">
          <h3>{song.title}</h3>
          <p><span>By</span> {song.artist}</p>
          <p><span>From</span> {song.albumTitle}</p>
        </div>
      </div>
    )
  }
}

export default Song

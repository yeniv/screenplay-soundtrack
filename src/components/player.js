import React, { Component } from 'react'

class Player extends Component {
  render() {
    return (
      <div className='spotify-player'>

        <iframe
          title="player"
          src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>

      </div>
    )
  }
}

export default Player

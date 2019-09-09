import React, { Component } from 'react'
import './songPlayer.css'

class SongPlayer extends Component {
  state = { loading: true }

  render() {
    return (
      <iframe
        title="player"
        src={`https://open.spotify.com/embed/track/${this.props.value.id}`}
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media">
      </iframe>
    )
  }
}

export default SongPlayer

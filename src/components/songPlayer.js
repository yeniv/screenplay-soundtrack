import React, { Component } from 'react'
import './songPlayer.css'

class SongPlayer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    this.props.handleClick(!this.state.checked, this.props.value.uri)
    this.setState({checked: !this.state.checked})
  }

  render() {
    return (
      <div className="song-player">
        <div className="song-player-checkbox">
          <input
            type="checkbox"
            id={this.props.value.id}
            defaultChecked={this.state.checked}
            onChange={this.handleChange}
            />
          <label>Veto from saved playlist</label>
        </div>
        <iframe
          title="player"
          src={`https://open.spotify.com/embed/track/${this.props.value.id}`}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>
      </div>
    )
  }
}

export default SongPlayer

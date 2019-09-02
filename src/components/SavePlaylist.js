import React, { Component } from 'react'

class SavePlaylist extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {}
  }

  handleClick() {
    console.log('the button works!')
  }

  render() {
    return (
      <div className='save-playlist'>
      <button
        className="save-playlist-btn"
        onClick={this.handleClick}>Save {this.props.title} playlist to your Spotify</button>
      </div>
    )
  }
}

export default SavePlaylist

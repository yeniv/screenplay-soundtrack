import React, { Component } from 'react'

class SavePlaylist extends Component {
  constructor(props) {
    super(props)
    this.handleClick        = this.handleClick.bind(this)
    this.createPlaylist     = this.createPlaylist.bind(this)
    this.addSongsToPlaylist = this.addSongsToPlaylist.bind(this)
    this.state = {}
  }

  handleClick() {
    console.log('the button works!')
    console.log(this.props.userID)
    this.createPlaylist()
  }

  createPlaylist() {
    const baseURL     = "https://api.spotify.com/v1/users/"
    const name        = `${this.props.title} playlist`
    const description = "Created with PLOTIFY"
    const getRequest  = `${baseURL}${this.props.userID}/playlists`

    fetch(getRequest, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + this.props.token,
        'Content-Type': 'application/json'
        },
      body: {
        name: name,
        description: description
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch(error => console.log(error))
  }

  addSongsToPlaylist(){}

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

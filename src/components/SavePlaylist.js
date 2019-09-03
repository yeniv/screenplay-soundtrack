import React, { Component } from 'react'

class SavePlaylist extends Component {
  constructor(props) {
    super(props)
    this.createPlaylist     = this.createPlaylist.bind(this)
    this.addSongsToPlaylist = this.addSongsToPlaylist.bind(this)
    this.getPlaylistURIS    = this.getPlaylistURIS.bind(this)
    this.state = {
      playlistData: {},
      playlistCreated: false
    }
  }

  createPlaylist() {
    const baseURL     = "https://api.spotify.com/v1/users/"
    const name        = `${this.props.title} playlist`
    const description = `Created with PLOTIFY from the plot of ${this.props.title}.`
    const getRequest  = `${baseURL}${this.props.userID}/playlists`

    fetch(getRequest, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + this.props.token,
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: name,
        description: description
      })
    })
    .then(response => response.json())
    .then((data) => {
      const playlistData = {
        ID: data.id,
        URI: data.uri
      }
      this.setState({
        playlistData: playlistData,
        playlistCreated: true
      })
      return playlistData.ID
    })
    .then(playlistID => this.addSongsToPlaylist(playlistID))
    .catch(error => console.log(error))
  }

  addSongsToPlaylist(playlistID) {
    const baseURL     = "https://api.spotify.com/v1/playlists/"
    const getRequest  = `${baseURL}${playlistID}/tracks`

    fetch(getRequest, {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + this.props.token,
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        "uris": this.getPlaylistURIS()
      })
    })
    .catch(error => console.log(error))
  }

  getPlaylistURIS() {
    return this.props.songs.map((song) => {
      return song.uri
    })
  }

  render() {
    return (
      <div className='save-playlist'>
      {!this.state.playlistCreated && <p>playlist not created</p>}
      <button
        className="save-playlist-btn"
        onClick={this.createPlaylist}>Save {this.props.title} playlist to your Spotify</button>
      </div>
    )
  }
}

export default SavePlaylist

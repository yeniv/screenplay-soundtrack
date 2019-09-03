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
    const name        =  this.props.title
    const description = `Playlist created with PLOTIFY.`
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
      this.addSongsToPlaylist(playlistData.ID)
    })
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
      <button
        className="save-playlist-btn"
        onClick={this.createPlaylist}>Save playlist on Spotify</button>
    )
  }
}

export default SavePlaylist

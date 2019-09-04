import React, { Component } from 'react'
import './spotifyLogin.css'

class SpotifyLogin extends Component {
  render() {
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)
    console.log(process.env.REACT_APP_OMDB_API_KEY)

    const authEndpoint  = "https://accounts.spotify.com/authorize"
    const clientId      = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectUri   = "http://localhost:3000"
    const scopes        = ["streaming", "user-read-currently-playing", "user-read-playback-state", "user-read-email", "user-read-private", "playlist-modify-public"]
    const getRequest    = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

    return (
      <a
      className="login-button"
      href={getRequest}>
        Login to Spotify
      </a>
    )
  }
}

export default SpotifyLogin

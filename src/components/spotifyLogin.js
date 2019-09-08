import React, { Component } from 'react'
import './spotifyLogin.css'

class SpotifyLogin extends Component {
  render() {
    const authEndpoint  = "https://accounts.spotify.com/authorize"
    const clientId      = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const scopes        = ["streaming", "user-read-currently-playing", "user-read-private", "playlist-modify-public"]
    const origin        = window.location.origin
    const redirectUri   = origin === 'http://localhost:3000' ? origin : origin + '/'
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

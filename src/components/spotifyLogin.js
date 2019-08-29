import React, { Component } from 'react'

class SpotifyLogin extends Component {
  render() {
    const authEndpoint  = "https://accounts.spotify.com/authorize"
    const clientId      = "dfedd5baf69f4047928423798381296f"
    const redirectUri   = "http://localhost:3000"
    const scopes        = ["user-read-currently-playing", "user-read-playback-state"]
    const getRequest    = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

    return (
      <div className='spotify-login'>
        <a
          href={getRequest}>
          Login to Spotify
        </a>
      </div>
    )
  }
}

export default SpotifyLogin

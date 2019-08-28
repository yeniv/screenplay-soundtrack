import React, { Component } from 'react'

class SpotifyLogin extends Component {
  render() {
    // string interpolated url hits error message

    // const authEndpoint = "https://accounts.spotify.com/authorize"
    // const clientId = "dfedd5baf69f4047928423798381296f"
    // const redirectUri = "http://localhost:3000"
    // const scopes = ["user-read-currently-playing", "user-read-playback-state"]

    // const spotifyGetRequest = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

    return (
      <div className='spotify-login'>
        <a
          href="https://accounts.spotify.com/authorize?client_id=dfedd5baf69f4047928423798381296f&response_type=token&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-playback-state&show_dialog=true">
          Login to Spotify
        </a>
      </div>
    )
  }
}

export default SpotifyLogin

import React, { Component } from 'react'
import Song from './song.js'

class Playlist extends Component {
  constructor(props) {
    super(props)
    this.spotifySearch = this.spotifySearch.bind(this)
    this.state = {
      songs: []
    }
  }

  spotifySearch(search) {
    const baseURL     = "https://api.spotify.com/v1/search"
    const type        = "track"
    const limit       = "1"
    const getRequest  = `${baseURL}?q=${search}&type=${type}&limit=${limit}`

    fetch(getRequest, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + this.props.token
        }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.tracks.items.length === 0) {
        return null
      }
      const info = data.tracks.items[0]
      const songData = {
        title: info.name,
        uri: info.uri,
        artist: info.album.artists[0].name,
        albumTitle: info.album.name,
        albumCover: info.album.images[0].url
      }
      this.setState({
        songs: this.state.songs.concat(songData)
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    const topics = this.props.topics
    topics.forEach((topic) => {
      console.log(topic)
      this.spotifySearch(topic)
    })
  }

  render() {
    console.log('playlist render!')
    return (
      <div className='playlist'>
        <p>{this.state.topics}</p>
        {
          this.state.songs.map((song, index) => {
            return <Song value={song} key={index}/>
          })
        }
      </div>
    )
  }
}

export default Playlist

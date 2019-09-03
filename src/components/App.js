import React, { Component } from "react"

import Nav          from "./nav.js"
import Header       from "./header.js"
import Search       from "./search.js"
import Poster       from "./poster.js"
import SavePlaylist from "./savePlaylist.js"
import Playlist     from "./playlist.js"
import Footer       from "./footer.js"
import SpotifyLogin from "./spotifyLogin.js"

import nlp          from 'compromise'

import './App.css'

const hashFragment = window.location.hash
  .substring(1)
  .split("&")
  .reduce((accumulator, currentValue) => {
    if (currentValue) {
      const parts = currentValue.split("=")
      accumulator[parts[0]] = decodeURIComponent(parts[1])
    }
    return accumulator
  }, {})

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.getTopics          = this.getTopics.bind(this)
    this.movieSearch        = this.movieSearch.bind(this)
    this.removeDuplicates   = this.removeDuplicates.bind(this)
    this.getSpotifyUserData = this.getSpotifyUserData.bind(this)
    this.state = {
      token:        null,
      searchInput:  "",
      songs:        [],
      movie:        null,
      userData:     null
    }
  }

  componentDidMount() {
    const token = hashFragment.access_token
    if (token) {
      this.setState({token: token})
      this.getSpotifyUserData(token)
    }
  }

  getSpotifyUserData(token){
    const getRequest  = "https://api.spotify.com/v1/me"

    fetch(getRequest, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + token
        }
    })
    .then(response => response.json())
    .then((data) => {
      const userData = {
        id: data.id,
        displayName: data.display_name,
        image: data.images[0].url
      }
      this.setState({userData: userData})
    })
    .catch(error => console.log(error))
  }

  movieSearch(search) {
    const baseURL     = 'http://www.omdbapi.com/?t='
    const searchQuery = search.replace(' ', '+')
    const plot        = 'full'
    const apiKey      = 'a7198c97'
    const getRequest  = `${baseURL}${searchQuery}&plot=${plot}&apikey=${apiKey}`

    fetch(getRequest)
    .then(response => response.json())
    .then((data) => {
      const movieData = {
        title:  data.Title,
        plot:   data.Plot,
        actors: data.Actors,
        poster: data.Poster
      }

      this.setState({movie: movieData})

      const topics = this.getTopics(movieData.plot)
      const noDups = this.removeDuplicates(topics)
      noDups.forEach(topic => {this.spotifySearch(topic)})
    })
    .catch(error => console.log(error))
  }

  spotifySearch(search) {
    const baseURL     = "https://api.spotify.com/v1/search"
    const type        = "track"
    const limit       = "1"
    const getRequest  = `${baseURL}?q=${search}&type=${type}&limit=${limit}`

    fetch(getRequest, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + this.state.token
        }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.tracks.items.length === 0) {
        return null
      }
      const info = data.tracks.items[0]
      const songData = {
        title:      info.name,
        id:         info.id,
        uri:        info.uri,
        artist:     info.album.artists[0].name,
        albumTitle: info.album.name,
        albumCover: info.album.images[0].url,
        url:        info.external_urls.spotify
      }
      console.log(songData)
      this.setState({
        songs: this.state.songs.concat(songData)
      })
    })
    .catch(error => console.log(error))
  }

  getTopics(string) {
    const topics = nlp(string).nouns().out("array")
    this.setState({topics: topics})
    return topics
  }

  removeDuplicates(array) {
    return array.filter((item, index) => {
      return array.indexOf(item) >= index
    })
  }

  handleSearchChange(input) {
    this.setState({searchInput: input})
  }

  handleSearchSubmit() {
    this.setState({songs: []})
    this.movieSearch(this.state.searchInput)
  }

  render() {
    return (
      <div className="container">


          {!this.state.token &&
            <SpotifyLogin />}

          {this.state.token &&
            <div className="navigation">

              <Header />

              <Search
                value={this.state.searchInput}
                handleSearchChange={this.handleSearchChange}
                handleSearchSubmit={this.handleSearchSubmit} />

              {this.state.movie &&
                <div className="navigation-content">
                  <Poster
                    title={this.state.movie.title}
                    poster={this.state.movie.poster}
                    plot={this.state.movie.plot}
                    topics={this.state.topics} />

                  <SavePlaylist
                    token={this.state.token}
                    userID={this.state.userData.id}
                    title={this.state.movie.title}
                    songs={this.state.songs} />

                  <Footer />
                </div>}
            </div>}

        <Playlist
          songs={this.state.songs} />

      </div>
    )
  }
}

export default App

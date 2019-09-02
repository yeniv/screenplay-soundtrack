import React, { Component } from "react"

import Header from "./header.js"
import Search from "./search.js"
import Playlist from "./playlist.js"
import Footer from "./footer.js"
import SpotifyLogin from "./spotifyLogin.js"

import nlp from 'compromise'

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
    this.getTopics = this.getTopics.bind(this)
    this.movieSearch = this.movieSearch.bind(this)
    this.state = {
      token: null,
      searchInput: "",
      songs: [],
      movie: null
    }
  }

  componentDidMount() {
    const token = hashFragment.access_token
    if (token) {
      this.setState({token: token})
    }
  }

  movieSearch(search) {
    const baseURL     = 'http://www.omdbapi.com/?t='
    const searchQuery = search.replace(' ', '+')
    const plot        = 'full'
    const apiKey      = 'a7198c97'
    const getRequest  = `${baseURL}${searchQuery}&plot=${plot}&apikey=${apiKey}`

    fetch(getRequest)
    .then((response) => response.json())
    .then((data) => {
      const movieData = {
        plot: data.Plot,
        actors: data.Actors,
        poster: data.Poster
      }
      this.setState({movie: movieData})

      const topics = this.getTopics(movieData.plot)

      topics.forEach((topic) => {
        this.spotifySearch(topic)
      })
    })
    .catch((error) => {
      console.log(error);
    });
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
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

  getTopics(string) {
    return nlp(string).nouns().out("array")
  }

  handleSearchChange(input) {
    this.setState({searchInput: input})
  }

  handleSearchSubmit() {
    this.setState({songs: []})
    this.movieSearch(this.state.searchInput)
  }

  render() {
    console.log(this.state.songs)
    return (
      <div className="container">
          {!this.state.token &&
            <SpotifyLogin />}

          {this.state.token &&
            <div className="app">

              <Header />

              <Search
                value={this.state.searchInput}
                handleSearchChange={this.handleSearchChange}
                handleSearchSubmit={this.handleSearchSubmit} />

              {this.state.movie &&
                <Playlist
                  songs={this.state.songs} />}
              <Footer />
            </div>}
      </div>
    )
  }
}

export default App

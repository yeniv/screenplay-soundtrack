import React, { Component } from "react"

import Header from "./header.js"
import Search from "./search.js"
import Playlist from "./playlist.js"
import Footer from "./footer.js"

import SpotifyLogin from "./spotifyLogin.js"
import longestWord from "./longestWord.js"

import nlp from 'compromise';

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
    this.spotifySearch = this.spotifySearch.bind(this)
    this.state = {
      token: null,
      searchInput: "",
      songs: []
      // searchSubmit: ""
    }
  }

  componentDidMount() {
    const token = hashFragment.access_token
    if (token) {
      this.setState({token: token})
    }
  }

  spotifySearch(searchTerms) {
    const baseURL     = "https://api.spotify.com/v1/search"
    const searchQuery = searchTerms //.join(" ")
    const type        = "track"
    const limit       = "1"
    const getRequest  = `${baseURL}?q=${searchQuery}&type=${type}&limit=${limit}`

    fetch(getRequest, {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + this.state.token
        }
    })
    .then((response) => response.json())
    .then((data) => {
      const info = data.tracks.items[0]
      const newSong = {
        title: info.name,
        uri: info.uri,
        artist: info.album.artists[0].name,
        albumTitle: info.album.name,
        albumCover: info.album.images[0].url
      }
      this.setState({
        songs: this.state.songs.concat(newSong)
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
    this.spotifySearch(this.state.searchInput)
  }

  render() {
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
              <Playlist
                songs={this.state.songs} />
              <Footer />
            </div>}
      </div>
    )
  }
}

export default App

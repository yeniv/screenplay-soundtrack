import React, { Component } from "react"

import Header from "./header.js"
import Search from "./search.js"
import Playlist from "./playlist.js"
import Footer from "./footer.js"

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
    this.getNouns = this.getNouns.bind(this)
    this.state = {
      token: null,
      searchInput: "",
      searchInputNouns: "",
      // playlistValue is only for testing the components are working as expected
      playlistValue: ""
    }
  }

  componentDidMount() {
    const token = hashFragment.access_token
    if (token) {
      this.setState({token: token})
      console.log(token)
    }
  }

  getNouns(string) {
    return nlp(string).nouns().out('array')
  }

  handleSearchChange(input) {
    this.setState({searchInput: input})
  }

  handleSearchSubmit() {
    const searchInput = this.state.searchInput
    this.setState({playlistValue: searchInput})
    this.setState({searchInputNouns: this.getNouns(this.state.searchInput)})
  }

  render() {
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const clientId = "dfedd5baf69f4047928423798381296f"
    const redirectUri = "http://localhost:3000"
    const scopes = ["user-read-currently-playing", "user-read-playback-state"]

    return (
      <div className="container">
        <div className="app">
          <a
            href="https://accounts.spotify.com/authorize?client_id=dfedd5baf69f4047928423798381296f&response_type=token&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-playback-state&show_dialog=true">
            Login to Spotify
          </a>
          <Header />
          <Search
            value={this.state.searchInput}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit} />
          <Playlist
            value={this.state.playlistValue} />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App

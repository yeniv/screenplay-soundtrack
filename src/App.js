import React, { Component } from "react"
import Header from "./components/header.js"
import Search from "./components/search.js"
import Playlist from "./components/playlist.js"

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.state = {
      searchInput: "",
      // playlistValue is only for testing the components are working as expected
      playlistValue: ""
    }
  }

  handleSearchChange(input) {
    this.setState({searchInput: input})
  }

  handleSearchSubmit() {
    const searchInput = this.state.searchInput
    this.setState({playlistValue: searchInput})
  }

  render() {
    return (
      <div className="container">
        <div className="app">
          <Header
            title="Twitter Playlist"
            description="Enter a Twitter handle to create a playlist." />

          <Search
            value={this.state.searchInput}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit} />

          <Playlist
            value={ this.state.playlistValue} />

        </div>
      </div>
    )
  }
}

export default App

import React, { Component } from "react"

import Header from "./header.js"
import Search from "./search.js"
import Playlist from "./playlist.js"
import Footer from "./footer.js"

import nlp from 'compromise';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.getNouns = this.getNouns.bind(this)
    this.state = {
      searchInput: "",
      searchInputNouns: "",
      // playlistValue is only for testing the components are working as expected
      playlistValue: ""
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
    return (
      <div className="container">
        <div className="app">
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

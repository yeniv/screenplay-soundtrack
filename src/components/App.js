import React, { Component } from "react"

import Header from "./header.js"
import Search from "./search.js"
import Playlist from "./playlist.js"
import Footer from "./footer.js"

import SpotifyLogin from "./spotifyLogin.js"
import longestWord from "./longestWord.js"

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
      // searchSubmit: ""
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
      this.setState({
        movie: movieData
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
    this.movieSearch(this.state.searchInput)
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

              {this.state.movie &&
                <Playlist
                  token={this.state.token}
                  topics={this.getTopics(this.state.movie.plot)} />}

              <Footer />
            </div>}
      </div>
    )
  }
}

export default App

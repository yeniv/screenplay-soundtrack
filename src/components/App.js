import React, { Component } from "react"

import NavHeader      from "./navHeader.js"
import Header         from "./header.js"
import Search         from "./search.js"
import Poster         from "./poster.js"
import SavePlaylist   from "./save-playlist.js"
import Playlist       from "./playlist.js"
import MovieNotFound  from "./movieNotFound.js"
import SpotifyLogin   from "./spotifyLogin.js"
import LogoutButton   from "./logout_button.js"
import Footer         from './footer.js'
import ErrorHandler   from "./errorHandler.js"

import nlp            from 'compromise'

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
    this.logout = this.logout.bind(this)
    this.state = {
      token:        null,
      searchInput:  '',
      songs:        [],
      movie:        null,
      userData:     null,
      movieFound:   false,
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
      }
      this.setState({userData: userData})
    })
    .catch(error => console.log(error))
  }

  movieSearch(search) {
    const baseURL     = 'https://www.omdbapi.com/?t='
    const searchQuery = search.replace(' ', '+')
    const plot        = 'full'
    const apiKey      = process.env.REACT_APP_OMDB_API_KEY
    const getRequest  = `${baseURL}${searchQuery}&plot=${plot}&apikey=${apiKey}`

    fetch(getRequest)
    .then(response => response.json())
    .then((data) => {
      if (data.Response === 'False') {
        console.log('movie not found!')
        this.setState({movieFound: false})
      }

      const movieData = {
        title:  data.Title,
        plot:   data.Plot,
        actors: data.Actors,
        poster: data.Poster
      }

      this.setState({
        movie: movieData,
      })

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
      this.setState({
        songs: this.state.songs.concat(songData),
        movieFound: true
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

  logout() {
    this.setState({
      token: null,
      movie: null,
      songs: []
    })
    window.location.href = window.location.origin
  }

  handleSearchChange(input) {
    this.setState({searchInput: input})
  }

  handleSearchSubmit() {
    this.setState({songs: []})
    this.movieSearch(this.state.searchInput)
  }

  render() {
    let greeting
    if (this.state.token) {
      greeting = <Search
                  value={this.state.searchInput}
                  handleSearchChange={this.handleSearchChange}
                  handleSearchSubmit={this.handleSearchSubmit} />
    } else {
      greeting = <SpotifyLogin origin={this.state.origin}/>
    }

    return (
      <ErrorHandler>
      <div className="container">

          <div className="container-left">

            {!this.state.movie &&
              <div className="welcome-message">
                <Header />
                {greeting}
              </div>}

            {this.state.movie &&
              <div className="after-welcome-content">
                <div className="navbar">
                  <div className="navbar-left">
                    <NavHeader />

                    <Search
                      value={this.state.searchInput}
                      handleSearchChange={this.handleSearchChange}
                      handleSearchSubmit={this.handleSearchSubmit} />
                  </div>

                  {this.state.songs.length > 0 &&
                    <SavePlaylist
                      token={this.state.token}
                      userID={this.state.userData.id}
                      title={this.state.movie.title}
                      songs={this.state.songs} />}
                </div>

                <Poster
                  title={this.state.movie.title}
                  poster={this.state.movie.poster}
                  plot={this.state.movie.plot}
                  topics={this.state.topics} />

                <LogoutButton
                  handleClick={this.logout}/>

                <Footer />

                <MovieNotFound
                  movieFound={this.state.movieFound}/>

              </div>}
          </div>
        <Playlist
          songs={this.state.songs} />

      </div>
      </ErrorHandler>
    )
  }
}

export default App

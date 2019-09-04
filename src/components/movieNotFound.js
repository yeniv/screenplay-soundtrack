import React, { Component } from "react"

class MovieNotFound extends Component {
  render() {
    if (this.props.movieFound) {
      return null
    }

    return (
      <div className='movie-not-found'>
        <img
          src="https://media.giphy.com/media/3oEdvaxcFPKdt9V5mM/giphy.gif"
          alt=""
          width="600"
          height="325"/>
      </div>
    )
  }
}

export default MovieNotFound

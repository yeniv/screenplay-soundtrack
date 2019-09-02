import React, { Component } from 'react'

class Playlist extends Component {
  render() {
    return (
      <div className='poster'>
        <img src={this.props.poster} alt=""/>
        <div className="poster-info">
          <p>Plot: {this.props.plot}</p>
          <p>Topics: {this.props.topics}</p>
        </div>
      </div>
    )
  }
}

export default Playlist

import React, { Component } from 'react'

class Playlist extends Component {
  render() {
    return (
      <div className='poster'>
        <img src={this.props.poster} alt=""/>
        <div className="poster-info">
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.plot}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Playlist

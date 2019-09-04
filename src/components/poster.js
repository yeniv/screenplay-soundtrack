import React, { Component } from 'react'
import Footer from './footer.js'
import './poster.css'

class Poster extends Component {
  render() {
    if (!this.props.poster) {
      return null
    }

    return (
      <div className='poster'>
        <img src={this.props.poster} alt=""/>
        <div className="poster-info">
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.plot}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Poster

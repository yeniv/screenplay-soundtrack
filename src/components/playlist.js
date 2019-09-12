import React, { Component } from 'react'
import SongPlayer           from './songPlayer.js'
import LogoutButton         from "./logout_button.js"


import './playlist.css'

class Playlist extends Component {
  render() {
    return (
      <div className='playlist'>
        {
          this.props.songs.map((song, index) => {
            return <SongPlayer value={song} key={index} />
          })
        }

        {this.props.movieFound &&
        <div className='footer footer-mobile'>
          <LogoutButton handleClick={this.props.handleClick} />
          <p><a href="http://twitter.com/tristanviney" target="blank">Built {this.props.test} for the love of movies by <strong>@tristanviney</strong></a></p>
        </div>}
      </div>
    )
  }
}

export default Playlist

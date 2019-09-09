import React, { Component } from 'react'
import './songPlayer.css'

class SongPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount(){
    this.setState({loading: false})
  }

  render() {
    if (this.state.loading) {
      return <p>loading...</p>
    } else {
      return (
        <iframe
          title="player"
          src={`https://open.spotify.com/embed/track/${this.props.value.id}`}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>
      )
    }
  }
}

export default SongPlayer

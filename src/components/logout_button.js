import React, { Component } from 'react'
import './logout_button.css'

class LogoutButton extends Component {
  render() {
    return (
      <button
        className="logout-button"
        onClick={this.props.handleClick}>
        Sign out
      </button>
    )
  }
}

export default LogoutButton

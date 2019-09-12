import React, { Component } from 'react'
import './navHeader.css'

class NavHeader extends Component {
  render() {
    return (
      <div
        className="nav-title"
        onClick={this.props.handleClick}>
          <h1 className="large-nav-title">PL<span>🍿</span>TIFY</h1>
          <h1 className="small-nav-title"><span>🍿</span></h1>
      </div>
    )
  }
}

export default NavHeader

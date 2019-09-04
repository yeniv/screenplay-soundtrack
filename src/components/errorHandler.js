import React, { Component } from "react"

class ErrorHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oh my. Something's gone terribly, terribly wrong.</h1>
    }
    return this.props.children
  }
}

export default ErrorHandler

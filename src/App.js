import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>{ this.props.title }</h1>
        <h3>{ this.props.description }</h3>
      </div>
    );
  }
}

class Search extends Component {
  render() {
    return (
      <div className='search'>
        <h4>@</h4>

      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search_input: ''
    }
  }

  render() {
    return (
      <Header
        title="Twitter Playlist"
        description="Enter a Twitter handle to create a playlist." />
    )
  }
}

export default App;

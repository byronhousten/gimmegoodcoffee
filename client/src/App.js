import React, { Component } from 'react';
import './App.css';

import Error from './Error';
import Form from './Form';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      results: []
    }
  }

  render() {
    return (
      <div className="App">
          { this.state.error ? <Error error={ this.state.error } /> : '' }
          { this.state.results.length ? '' : <Form handleError={ (error) => this.setState({error}) } /> }
      </div>
    );
  }
}


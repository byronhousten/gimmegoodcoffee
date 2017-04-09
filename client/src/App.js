import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Error from './Error';
import Form from './Form';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            latitude: null,
            location: null,
            longitude: null,
            results: []
        }
    }

    handleUpdateLatitudeLongitude(latitude, longitude) {
      this.setState({ latitude, longitude });

        axios(`/api/search?latitude=${ latitude }&longitude=${ longitude }`);
    }

    handleUpdateLocation(location) {
        this.setState({ location });

        axios(`/api/search?location=${ location }`);
    }

    render() {
        return (
            <div className="App">
                { this.state.error ? <Error error={ this.state.error } /> : '' }
                { this.state.results.length ? '' : <Form onError={ (error) => this.setState({error}) }
                                                         onUpdateLatitudeLongitude={ (latitude, longitude) => this.handleUpdateLatitudeLongitude(latitude, longitude) }
                                                         onUpdateLocation={(location) => { this.handleUpdateLocation(location) }} /> }
            </div>
        );
    }
}


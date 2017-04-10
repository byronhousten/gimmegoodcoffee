import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Error from './Error';
import Form from './Form';
import Results from './Results';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            latitude: null,
            loading: false,
            longitude: null,
            results: []
        }
    }

    handleUpdateLatitudeLongitude(latitude, longitude) {
      this.setState({ latitude, longitude });

        axios(`/api/search?latitude=${ latitude }&longitude=${ longitude }`)
            .then(response => {
                this.setState({
                    loading: false,
                    results: response.data.body.businesses
                });
            });
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                    <i className="ion-loading-a" />
                </div>
            );
        }

        return '';
    }

    render() {
        return (
            <div className="App">
                { this.state.error ? <Error error={ this.state.error } /> : '' }

                <Form onError={ (error) => this.setState({error}) }
                      onLoading={ () => this.setState({ loading: true }) }
                      onUpdateLatitudeLongitude={ (latitude, longitude) => this.handleUpdateLatitudeLongitude(latitude, longitude) } />

                { this.renderLoading() }

                { this.state.results.length && ! this.state.loading ? <Results latitude={ this.state.latitude } longitude={ this.state.longitude } /> : '' }

            </div>
        );
    }
}


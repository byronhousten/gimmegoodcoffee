import React, { Component } from 'react';
import './Form.css';

import axios from 'axios';

export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            location: ''
        }
    }

    getGeolocation() {
        this.setState({ loading: true });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.handleGeolocationSuccess, this.handleGeolocationError);
        } else {
            this.props.onError("Geolocation is not supported by this browser.");
        }
    }

    handleGeolocationSuccess = (position) => {
        this.setState({ loading: false });

        this.props.onUpdateLatitudeLongitude(
            position.coords.latitude,
            position.coords.longitude
        );
    };

    handleGeolocationError = (error) => {
        this.setState({ loading: false });

        switch(error.code) {
            case 1:
                this.props.onError("User denied the request for Geolocation.");
                break;
            case 2:
                this.props.onError("Location information is unavailable.");
                break;
            case 3:
                this.props.onError("The request to get user location timed out.");
                break;
            default:
                this.props.onError("An unknown error occurred.");
                break;
        }
    };

    handleGeocodeFromAddress() {
        this.props.onLoading();

        axios(`/api/geocode?address=${ this.state.location }`)
            .then(response => {
                this.props.onUpdateLatitudeLongitude(
                    response.data.body.results[0].geometry.location.lat,
                    response.data.body.results[0].geometry.location.lng
                );
            });
    }

    render() {
        return (
            <div className="Form">
                <h1>Need Coffee?</h1>

                <i className={ this.state.loading ? 'ion-loading-a' : 'ion-location'} onClick={ () => this.getGeolocation() } />
                <input placeholder="Enter your location"
                       onChange={ (e) => this.setState({ location: e.target.value })}
                       type="text"
                       value={ this.state.location } />
                <br />

                <button className="submit" onClick={ () => { this.handleGeocodeFromAddress() }}>Gimme Caffeine!</button>
            </div>
        );
    }
}

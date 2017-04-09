import React, { Component } from 'react';
import './Form.css';

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

    render() {
        return (
            <div>
                <h1>Need Coffee?</h1>

                <i className={ this.state.loading ? 'ion-loading-a' : 'ion-location'} onClick={ () => this.getGeolocation() } />
                <input placeholder="Enter your location"
                       onChange={ (e) => this.setState({ location: e.target.value })}
                       type="text"
                       value={ this.state.location } />
                <br />

                <button className="submit" onClick={() => { this.props.onUpdateLocation(this.state.location) }}>Gimme Caffeine!</button>
            </div>
        );
    }
}

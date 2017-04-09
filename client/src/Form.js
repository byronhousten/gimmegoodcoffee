import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            loading: false
        }
    }

    getLocation() {
        this.setState({ loading: true });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError);
        } else {
            this.props.handleError("Geolocation is not supported by this browser.");
        }
    }

    handleSuccess = (position) => {
        console.log(position.coords);
        this.setState({ loading: false });
    };

    handleError = (error) => {
        this.setState({ loading: false });

        switch(error.code) {
            case 1:
                this.props.handleError("User denied the request for Geolocation.");
                break;
            case 2:
                this.props.handleError("Location information is unavailable.");
                break;
            case 3:
                this.props.handleError("The request to get user location timed out.");
                break;
            default:
                this.props.handleError("An unknown error occurred.");
                break;
        }
    };

    render() {
        return (
            <div>
                <h1>Need Coffee?</h1>

                <i className={ this.state.loading ? 'ion-loading-a' : 'ion-location'} onClick={ () => this.getLocation() } />
                <input className="input-field" placeholder="Enter your location" type="text" />
                <br />

                <button className="submit" onClick={() => {}}>Gimme Caffeine!</button>
            </div>
        );
    }
}

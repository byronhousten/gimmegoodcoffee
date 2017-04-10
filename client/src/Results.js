import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

/* eslint-disable */
export default class Results extends Component {
    render() {
        return (
            <div>
                <ReactMapboxGl
                    style="mapbox://styles/mapbox/streets-v8"
                    accessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
                    center={[ this.props.longitude, this.props.latitude ]}
                    containerStyle={{
                        height: '400px',
                        margin: '0 auto',
                        paddingTop: '50px',
                        width: '500px'
                    }}>
                    <Marker coordinates={[-87.65928, 41.9433099]}>
                        <i className="ion-coffee" />
                    </Marker>
                </ReactMapboxGl>
            </div>
        );
    }
}

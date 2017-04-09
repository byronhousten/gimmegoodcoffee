import React from 'react';
import './Error.css';

export default ({ error }) => {
    return (
        <div className="Error">
            <i className="ion-close-circled" /> { error }
        </div>
    );
}

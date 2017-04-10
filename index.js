const express = require('express');
const http = require('http');
const app = express();
const fetch = require('node-fetch');
const request = require('request-promise');

// Server

app.set('port', (process.env.API_PORT || 3001));

app.get('/api/', (req, res) => {
    res.status(200).json({
        message: 'API is running!'
    });
});

app.get('/api/geocode', (req, res) => {
    request({
        method: 'GET',
        uri: `https://maps.google.com/maps/api/geocode/json?address=${ req.query.address }`
    }).then(response => {
        res.status(200).json({
            body: JSON.parse(response)
        });
    }).catch(error => {
        console.log(error);
    });
});

app.get('/api/search', (req, res) => {
    search(req.query).then((response) => {
        res.status(200).json({
            body: response
        });
    });
});

app.listen(app.get('port'), () => {
    console.log(`API server listening on http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


// Yelp

let token;

const getAccessToken = () => {
    if (token) {
        return Promise.resolve(token);
    } else {
        return request({
            method: 'POST',
            uri: 'https://api.yelp.com/oauth2/token',
            form: {
                client_id: process.env.YELP_CLIENT_ID,
                client_secret: process.env.YELP_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }
        }).then((response) => {
            token = JSON.parse(response).access_token;
            return token;
        });
    }
};

const search = (params) => {
    params = (typeof params === 'undefined') ? {} : params;

    return getAccessToken().then((token) => {
        return request({
            uri: 'https://api.yelp.com/v3/businesses/search' + jsonToQueryString(params) + '&term=coffee',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            return JSON.parse(res);
        }).catch((err) => {
            throw err;
        });
    });
};


const jsonToQueryString = (json) => {
    return '?' +
        Object.keys(json).map(function(key) {
            if (key === 'price') {
                return key + '=' + json[key];
            } else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }
        }).join('&');
};

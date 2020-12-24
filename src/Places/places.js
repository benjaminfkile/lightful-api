const express = require('express')
const placeRouter = express.Router()
const axios = require('axios').default;

placeRouter
    .route('/:place')
    .get((req, res, next) => {
        axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=AIzaSyDCWWJLRXoNkdEhcpgJbmnkoWI-8tOgl10&input=' + req.params.place + 'near%50montana', {
        }).then(suggestions => {
            res.json(suggestions.data)
        }).catch(next)

    })
module.exports = placeRouter
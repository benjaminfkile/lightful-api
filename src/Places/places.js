const express = require('express')
const placeRouter = express.Router()
const axios = require('axios').default;

placeRouter
    .route('/:place')
    .get((req, res, next) => {
        axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=AIzaSyAj6zqW55nq95JI6gGGj-BtkN_hfZhJScM&input=' + req.params.place + 'near%50montana', {
        }).then(suggestions => {
            res.json(suggestions.data)
        }).catch(next)

    })
module.exports = placeRouter
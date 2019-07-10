const request = require('request')


// Geocode with callback

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2hyaW5pdmFzYiIsImEiOiJjanhqOWxpc2oxMzN2M29sOWpmeWNsamxwIn0.nuONXMASv_66381LKrSMxg&limit=1'
    
    request({url, json:true}, (error, response) => {
        if (error){
            
            callback('Unable to reach geocode services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find given location', undefined)
        } else {
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            
        }
    })
}

module.exports = geocode
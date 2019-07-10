
const request = require('request')


const forecast = (longitude, latitude, callback) => {
    url = 'https://api.darksky.net/forecast/35d7fc869638610e692e3e7605a1b208/'+longitude+','+latitude+'?units=si'

    request ({url , json:true}, (error, response ) => {
        
        if (error){
            //console.log('Unable to connect to firecast services.!')
            callback('Unable to connect to forecast services.!', undefined)
        } else if (response.body.error){
            //console.log('Unable to find forecast for given location .!')
            callback('Unable to find forecast for given location .!', undefined)
        } else {
            callback(undefined,{
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            })
        }
    })
    
}

module.exports = forecast
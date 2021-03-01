const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJqdW5zNjgxIiwiYSI6ImNrbGZvOG1uMjIwc20ydnM4YnBlZjJlaGkifQ.AMA5GdPAEJKkib71vlBu6w&limit=1'

    request({ url: url, json: true}, (error,response) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        } else if( response.body.features.length === 0) {
            callback('unable to find location. try other search', undefined)
        } else{
            callback(undefined, {
                lon: response.body.features[0].center[0],
                lat: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })    
}

module.exports = geocode
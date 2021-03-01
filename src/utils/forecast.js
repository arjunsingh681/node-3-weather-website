const request = require('request')

const forecast = ( lat, lon, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=f4461afdbd4b11566661f1619742e446&query=' + lat + ',' + lon + '&units=m'

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        } else if( response.body.error){
            callback('unable to find location. try other search', undefined)
        } else {
            callback(undefined, 'it is currently '+ response.body.current.temperature +' degress out. it is feel like '+response.body.current.feelslike+ ' degress out')
        }
    })
}



module.exports = forecast
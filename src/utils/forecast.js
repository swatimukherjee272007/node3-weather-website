const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+latitude+'&appid=52a6613bf212ad6cd89b7dd2c8a7785c'
    const json = true
    request({
        url,
        json},
        (error, {body}) => {
            if(error){
                callback(error)
            }
            else if(body.cod === '400'){
                callback(body.message)
            }
            else{
                callback(undefined , 'It is currently '+body.main.temp+ ' degrees out. There is a '+ body.main.humidity +'% chance of rain')
            }
        })
}


module.exports = forecast
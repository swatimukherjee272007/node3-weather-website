const request = require('request')


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic3dhdGltdWtoZXJqZWUyNzIwMDciLCJhIjoiY2s5ajl2OXFyMDZ5azNscWtnN2R5ODNhdCJ9.Il9LdMsCvSWundmMtM_7dA'
    const json = true
    request({
    url,
    json
    },(error, {body}) => {
      if(error)
      {
      callback('Unable to connect to the server', undefined)}
      else if(body.features.length === 0)
      {
    callback('Unable to find geoCode for the given address '+ address + '. Try another search', undefined)}
      else{
    callback(undefined, {
      latitude: body.features[0].center[0],
      longitude: body.features[0].center[1],
      location: body.features[0].place_name })
      }
    })}



    module.exports = geocode
    
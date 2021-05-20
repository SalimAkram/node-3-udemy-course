const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=214e01781acb8cdbdc3cd9fe4277c343&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, { body }) => {
    const currentTemp = body.current.temperature
    const feelsLikeTemp = body.current.feelslike
    const weatherDescription = body.current.weather_descriptions[0]
    
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback('Unable to find that location!')
    } else {
      callback(
        undefined, 
        `${weatherDescription}. It is currently ${currentTemp} degrees out.  It feels like ${feelsLikeTemp} degrees out`
      )
    }
  })
};

module.exports = forecast
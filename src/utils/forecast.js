const request = require ('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c9518b88ddf6e55e297bd8f9e767c9dc/' +latitude + ',' + longitude +'?units=auto&lang=fr';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        }else {
            const current = body.currently;
            callback(undefined, body.daily.data[0].summary + ' Is is currently '+ current.temperature +' degrees out. There is a '+ current.precipProbability + '% chance of rain.');
            
        }
        
    });
};

module.exports = forecast;
const express = require('express');
const hbs = require('hbs');
// const _=require('lodash');
// const axios = require('axios');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Weather Page',
    welcomeMessage: 'Welcome',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => 
{
  res.render('about.hbs', {
    pageTitle: 'About',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => 
{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});





const axios = require('axios');
const _=require('lodash');

var encodedAddress = encodeURIComponent("hyderbad");
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response1) => 
{
  if (response1.data.status === 'ZERO_RESULTS') 
  {
    throw new Error('Unable to find that address.');
  }  

  var lat = response1.data.results[0].geometry.location.lat;
  var lng = response1.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  console.log(response1.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response1) => 
{
  
  setTimeout(function(){
//High And Low temperature
  let hourly= response1.data.hourly.data;
  //console.log(hourly.length);
 
  var humidityArr=[]; //Humidity
  for(i=0;i<hourly.length;i++)
  {
  //  console.log(hourly[i].temperature);
    humidityArr.push(hourly[i].humidity);
  }
  console.log("Maximum humidity is : "+Math.max.apply(null,humidityArr));
  console.log("Minimum humidity is : "+Math.min.apply(null,humidityArr));
  // var maxHumidity = Math.max.apply(null,humidityArr);



  var temperature = response1.data.currently.temperature;
  var apparentTemperature = response1.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);


},50000);


app.get('/weather', (req, res) => 
{
   var humidityArr=[];
  var maxHumidity = Math.max.apply(null,humidityArr);

   var temperature = response1.data.currently.temperature;
  var apparentTemperature = response1.data.currently.apparentTemperature;

  console.log(temperature);
  res.render('weather.hbs', 
  {
    maxHumidity1:{maxHumidity},
    
    temperature1:{temperature},
    apparentTemperature1:{apparentTemperature},
    pageTitle: 'About',
    currentYear: new Date().getFullYear()
    
  });
});



  
}).catch((e) => 
{
  if (e.code === 'ENOTFOUND') 
  {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});


app.listen(3009, () => 
{
  console.log('Server is up on port 3009');
});

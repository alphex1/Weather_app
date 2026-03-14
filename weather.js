// CLOCK

function updateClock(){

let now = new Date()

document.getElementById("time").innerText =
now.toLocaleTimeString()

document.getElementById("date").innerText =
now.toDateString()

}

setInterval(updateClock,1000)
updateClock()



// GET CITY NAME

function getCity(lat, lon){

fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
.then(res => res.json())
.then(data => {

let city =
data.address.city ||
data.address.town ||
data.address.village ||
data.address.state

document.getElementById("city").innerText = city

})

}



// WEATHER

function getWeather(lat, lon){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(res => res.json())
.then(data => {

let temp = data.current_weather.temperature
let wind = data.current_weather.windspeed
let code = data.current_weather.weathercode

document.getElementById("temp").innerText =
"🌡 Temperature: " + temp + "°C"

document.getElementById("desc").innerText =
"💨 Wind Speed: " + wind + " km/h"

changeBackground(code)

})

}



// BACKGROUND CHANGER

function changeBackground(code){

let hour = new Date().getHours()
let rainLayer = document.querySelector(".rain-layer")

// night time
if(hour >= 18 || hour <= 6){

document.body.style.backgroundImage = "url('images/night.jpg')"
rainLayer.style.opacity = 0
return

}

// sunny
if(code === 0){

document.body.style.backgroundImage = "url('images/sunny.jpg')"
rainLayer.style.opacity = 0

}

// cloudy
else if(code >= 1 && code <= 3){

document.body.style.backgroundImage = "url('images/cloudy.jpg')"
rainLayer.style.opacity = 0

}

// rainy
else if(code >= 51 && code <= 67){

document.body.style.backgroundImage = "url('images/rainy.jpg')"
rainLayer.style.opacity = 0.4

}

// default
else{

document.body.style.backgroundImage = "url('images/day.jpg')"
rainLayer.style.opacity = 0

}

}



// GET USER LOCATION

navigator.geolocation.getCurrentPosition(

position => {

let lat = position.coords.latitude
let lon = position.coords.longitude

getCity(lat, lon)
getWeather(lat, lon)

},

error => {

document.getElementById("city").innerText =
"Location access denied"

}

)
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document. querySelector('.icon');
const cloudOutput = document.querySelector('.cloud' );
const humidityOutput = document.querySelector('.humidity ');
const windOutput = document.querySelector('.wind');
const pressureOutput = document.querySelector('.pressure');
const form = document.getElementById('locationInput');
const search = document. querySelector('.search');
const btn = document.querySelector('.submit');
const city = document.querySelector('.city');

let cityInput = "Delhi";

form.addEventListener('submit',(e) => {
    if(!search.value.length)
    {
        alert("Please enter location")
    }
    else{
        cityInput = search.value;
        fetchWeatherDetails();
        search.value = "";
        app.style.opacity = 0;
    }
    e.preventDefault();
});

function dayofWeek(day,month,year){
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekdays[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherDetails(){
    const url = `https://api.weatherapi.com/v1/current.json?key=286ebb615d4d4c7b93981123220207&q=${cityInput}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        temp.innerHTML = data.current.temp_c+"&#176";
        conditionOutput.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const year = parseInt(date.substr(0,4));
        const month = parseInt(date.substr(5,2));
        const day = parseInt(date.substr(8,2));
        const time = date.substr(11);
        dateOutput.innerHTML = `${dayofWeek(day,month,year)} ${day}, ${month} ${year}`
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;
        cloudOutput.innerHTML = data.current.cloud+" %";
        humidityOutput.innerHTML = data.current.humidity+" %";
        windOutput.innerHTML = data.current.wind_kph+" km/h";
        pressureOutput.innerHTML = data.current.pressure_in+" in";
        icon.src = data.current.condition.icon;
        let dayORnight = "Day";
        const code = data.current.condition.code;
        const cloudCodes = [1003,1006,1009,1030,1069,1087,1135,1273,1276,1279,1282];
        const rainCodes = [1063,1072,1150,1153,1180,1183,1186,1189,1192,1195,1204,1207,1240,1243,1246,1249,1252];

        if(!data.current.is_day){
            dayORnight = "Night";
        }

        if (code == 1000){
            app.style.backgroundImage = `url(https://github.com/srushti1hub/Weather-lens/blob/main/public/Images/Background/${dayORnight}/clear.png?raw=true)`
            app.style.opacity = 1;
        }
        else if(cloudCodes.includes(code)){
            app.style.backgroundImage = `url(https://github.com/srushti1hub/Weather-lens/blob/main/public/Images/Background/${dayORnight}/cloudy.png?raw=true)`
            app.style.opacity = 1;
        }
        else if(rainCodes.includes(code)){
            app.style.backgroundImage = `url(https://github.com/srushti1hub/Weather-lens/blob/main/public/Images/Background/${dayORnight}/rainy.png?raw=true)`
            app.style.opacity = 1;
        }
        else {
            app.style.backgroundImage = `url(https://github.com/srushti1hub/Weather-lens/blob/main/public/Images/Background/${dayORnight}/snowy.png?raw=true)`
            app.style.opacity = 1;
        }
    })
    .catch(() => {
        alert("City not found,please try again");
        app.style.opacity = 1;
    });
}

fetchWeatherDetails();
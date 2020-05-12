const key = '35799ddb5af2e8ba003d740cd5391dca';
const main = document.querySelector('.main-content');

const cityForm = document.querySelector('.cityName');

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    let city = document.querySelector('.city').value;
    cityForm.reset();

    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}`;

    const apiReq = new XMLHttpRequest();

    apiReq.open('GET', base + query, true);

    apiReq.onload = function() {
        if(this.status == 200) {
            let data = JSON.parse(this.responseText);
    
            console.log(data)
            //GET THE TIME
            let date = new Date (data.dt * 1000);
            let hour = date.getHours();
            let min = date.getMinutes();
            let day = date.getDay();
            let dayList = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
            
            //DISPLAY DATA
            main.innerHTML = `

                <div class="main-text">
                    <h1>${data.name}, ${data.sys.country}</h1>
                    <p>${dayList[day]} ${hour}:${min}</p>
                    <img src="./img/icon/${data.weather[0].icon}.png" alt="weather icon">
                    <p class="lead">${data.weather[0].main}</p>
                </div>
            `;

            //CHANGE BACKGROUND IMAGE
            document.body.style.backgroundImage = `url('img/${data.weather[0].icon}.jpg')`;

            const moreInfo =document.querySelector('.more-info');

            //SUNSET TIMESTAMP
            let sunset = new Date (data.sys.sunset * 1000);
            let sunsetHour = sunset.getHours();
            let sunsetMin = sunset.getMinutes();

            //SUNRISE TIMESTAMP
            let sunrise = new Date (data.sys.sunrise * 1000);
            let sunriseHour = sunrise.getHours();
            let sunriseMin = sunrise.getMinutes();


            moreInfo.innerHTML = `
            
            <h2>${Math.round(data.main.temp - 273.15)}&#176;C</h2>
            <p>TEMPERATURE</p>
    
            <div class="aditional">
            <div class="details">
                    <img src="./img/sunrise.svg" alt="sunset or sunrise">
                    <p><b>SUNRISE</b></p>
                    <p>${sunriseHour}:${sunriseMin}</p>
                </div>
                <div class="details">
                    <img src="./img/sunset.svg" alt="sunset or sunrise">
                    <p><b>SUNSET</b></p>
                    <p>${sunsetHour}:${sunsetMin}</p>
                </div>
                <div class="details">
                    <img src="./img/wind.svg" alt="wind icon">
                    <p><b>WIND</b></p>
                    <p>${data.wind.speed} m/s</p>
                </div>
                <div class="details">
                    <img src="./img/humidity.svg" alt="humidity icon">
                    <p><b>HUMIDITY</b></p>
                    <p>${data.main.humidity}%</p>
                </div>
            </div>
            `;


        };
    };

    apiReq.send();

    document.activeElement.blur();

})
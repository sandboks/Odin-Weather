/*
Class to handle HTML manipulation, reading and interpreting it
*/

/* import the WeatherData class for data collection when triggered by the user */
import { WeatherData } from "./weather.js";

//import imgSnow from "./img/weather/wi_snowman.svg";
import imgSnow from "./img/weather/wi_mostly-clear-snow.svg";
import imgCloud from "./img/weather/wi_cloudy.svg";
import imgRain from "./img/weather/wi_extreme-rain.svg";

export const DOM_Controller = (function () {
    async function TestFunction() {
        console.log("Hello, world");
        let data = await WeatherData.GetWeatherDataFromLocation("tokyo");
        InsertDataIntoPage(data);
    }

    function InsertDataIntoPage(data) {
        console.log(data);

        let today = data.days[0];

        const locationSpan = document.getElementById("locationSpan");
        const dateSpan = document.getElementById("dateSpan");
        const timeSpan = document.getElementById("timeSpan");
        locationSpan.textContent = data.resolvedAddress;
        dateSpan.textContent = new Date(today.datetime).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', });
        timeSpan.textContent = WeatherData.GetCurrentTimeInTimezone(data.tzoffset).substring(0,5);

        const temperatureReading = document.querySelector(".temperatureReading");
        temperatureReading.textContent = today.temp;

        const feelsLikeSpan = document.getElementById("feelsLikeSpan");
        feelsLikeSpan.textContent = `feels like ${today.feelslike}°`;

        const conditionImg = document.getElementById("conditionImg");
        const conditions = [
            ["CLOUDY", imgCloud],
            ["RAIN", imgRain],
            ["SNOW", imgSnow],
        ];
        for (let i = 0; i < conditions.length; i++) {
            let condition = conditions[i];
            if (today.conditions.toUpperCase().includes(condition[0]))
                conditionImg.src = condition[1];
        }
    }


    return {
        TestFunction,
    };

})();
/*
Class to handle weather API data, reading and interpreting it
*/

const apiKey = "VLJ2ZNYEW4LQATMDBET324BMR"; // I am well aware that including the key in the source code is bad practice - I haven't studied backend development yet, so for this project the key is exposed
//let units = "metric"; // "us" for Fahrenheit

import { UserData } from "./userData.js";

export const WeatherData = (function () {

    async function PerformWeatherSearch(location) {
        console.log("Starting");
        let data = await GetWeatherDataFromLocation(location);
        console.log("Finished!");
        console.log(data);


    }

    async function GetWeatherDataFromLocation(location) {
        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${UserData.GetTemperatureString()}&include=days,current&key=${apiKey}&contentType=json`;

        //const response = await fetch(request, {mode: 'cors'});
        //const data = await response.json();

        const response = await fetch(request, {mode: 'cors'});
        if (response.status === 400) {
            console.log("THROW ERROR MESSAGE");
            return null;
        }
        const data = await response.json();


       // GetCurrentTimeInTimezone(data.tzoffset);

        let resolvedAddress = data.resolvedAddress;



        //console.log(data);
        return data;
    }

    return {
        PerformWeatherSearch,
        GetWeatherDataFromLocation,
    };

})();
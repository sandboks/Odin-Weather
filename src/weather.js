/*
Class to handle weather API data, reading and interpreting it
*/
//3R46QQGG243KARZJY7MJFUD7U
//VLJ2ZNYEW4LQATMDBET324BMR
const apiKey = "3R46QQGG243KARZJY7MJFUD7U"; // I am well aware that including the key in the source code is bad practice - I haven't studied backend development yet, so for this project the key is exposed

import { UserData } from "./userData.js";

export const WeatherData = (function () {

    async function PerformWeatherSearch(location) {
        console.log("Starting");
        let data = await GetWeatherDataFromLocation(location);
        console.log("Finished!");
        console.log(data);
    }

    async function GetWeatherDataFromLocation(location) {
        //let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/next7days?unitGroup=${UserData.GetTemperatureString()}&include=days,current&key=${apiKey}&contentType=json`;
        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${UserData.GetTemperatureString()}&include=days,current&key=${apiKey}&contentType=json`;

        const response = await fetch(request, {mode: 'cors'});
        if (response.status >= 400 && response.status < 500) {
            console.log(`THROW ERROR MESSAGE. ERROR CODE: ${response.status}`);
            return null;
        }
        const data = await response.json();
        console.log(data);

        return data;
    }

    // requesting "yesterday" data consumes 24 quota units, 24x a normal search!
    // therefore I'm segregating this into a separate function, one that is used only after the user has requested detailed information on a place
    async function GetYesterdayWeatherDataFromLocation(location) {
        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday?unitGroup=${UserData.GetTemperatureString()}&include=days,current&key=${apiKey}&contentType=json`;

        const response = await fetch(request, {mode: 'cors'});
        if (response.status >= 400 && response.status < 500) {
            console.log(`THROW ERROR MESSAGE. ERROR CODE: ${response.status}`);
            return null;
        }
        const data = await response.json();

        console.log("SUCCESS");
        console.log(data);
        return data;
    }

    return {
        PerformWeatherSearch,
        GetWeatherDataFromLocation,
        GetYesterdayWeatherDataFromLocation,
    };

})();
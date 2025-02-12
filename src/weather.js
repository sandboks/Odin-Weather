/*
Class to handle weather API data, reading and interpreting it
*/

const apiKey = "VLJ2ZNYEW4LQATMDBET324BMR"; // I am well aware that including the key in the source code is bad practice - I haven't studied backend development yet, so for this project the key is exposed
let units = "metric"; // "us" for Fahrenheit

export const WeatherData = (function () {

    async function PerformWeatherSearch(location) {
        console.log("Starting");
        let data = await GetWeatherDataFromLocation(location);
        console.log("Finished!");
        console.log(data);


    }

    async function GetWeatherDataFromLocation(location) {
        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&include=days&key=${apiKey}&contentType=json`;

        //const response = await fetch(request, {mode: 'cors'});
        //const data = await response.json();

        const response = await fetch(request, {mode: 'cors'});
        if (response.status === 400) {
            console.log("THROW ERROR MESSAGE");
            return null;
        }
        const data = await response.json();


        GetCurrentTimeInTimezone(data.tzoffset);

        let resolvedAddress = data.resolvedAddress;



        //console.log(data);
        return data;
    }

    function GetCurrentTimeInTimezone(timezone) {
        // create Date object for current location
        var date = new Date();

        // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
        var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

        // create new Date object for a different timezone using supplied its GMT offset.
        var currentTime = new Date(utcTime + (3600000 * timezone));

        currentTime.getTimezoneOffset();
        console.log(`The time in this place is: ${currentTime.toLocaleTimeString()}`);

        return currentTime.toLocaleTimeString();
    }

    return {
        PerformWeatherSearch,
        GetWeatherDataFromLocation,
        GetCurrentTimeInTimezone,
    };

})();
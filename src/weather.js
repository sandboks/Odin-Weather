/*
Class to handle weather API data, reading and interpreting it
*/

export const WeatherData = (function () {

    function TestFunction() {
        console.log("HELLO");

        GetWeatherDataFromLocation("tokyo");
    }

    async function GetWeatherDataFromLocation(location) {
        //let string = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tokyo?unitGroup=metric&include=days&key=VLJ2ZNYEW4LQATMDBET324BMR&contentType=json";
        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=VLJ2ZNYEW4LQATMDBET324BMR&contentType=json`;
        //let data = null;

        const response = await fetch(request, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
    }

    return {
        TestFunction,
    };

})();
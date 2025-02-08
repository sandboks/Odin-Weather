/*
Class to handle HTML manipulation, reading and interpreting it
*/

/* import the WeatherData class for data collection when triggered by the user */
import { WeatherData } from "./weather.js";
import { DOM_Helper } from "./domHelper.js";

//import imgSnow from "./img/weather/wi_snowman.svg";
import imgUnknown from "./img/weather/cloud-question-outline.svg";
import imgSnow from "./img/weather/wi_mostly-clear-snow.svg";
import imgCloud from "./img/weather/wi_cloudy.svg";
import imgRain from "./img/weather/wi_extreme-rain.svg";

export const DOM_Controller = (function () {
    const OverviewPanelsRoot = document.querySelector(".PanelGrid");
    
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

    /*
    create one of several panels in the "overview" page, which shows a summary of multiple locations at once
    */

/*
<div class="WeatherPanel">
    <span id="locationSpan">Sydney, Australia</span>
    <span id="timeSpan">10:40</span>
    <div class="SideGrid">
        <div class="CenteredImage">
            <img src="./img/weather/wi_clear-day.svg" id="conditionImg">
        </div>
        <div class="CenteredImage">
            <div class="WeatherPanelMainTemperature">
                <span class="temperatureReading">5.1</span>
                <span class="degreesFloating">°</span>
            </div>
            <span id="feelsLikeSpan">feels like 2.1°</span>
        </div>
    </div>
</div>
*/

    async function CreateOverviewPanels(list) {
        await list.forEach((locationString) => CreateWeatherOverviewPanelAndFetchData(locationString));


    }

    async function CreateWeatherOverviewPanelAndFetchData(location, index = -1) {
        let panel = CreateBlankWeatherOverviewPanel(index);

        let data = await WeatherData.GetWeatherDataFromLocation(location);
        let today = data.days[0];

        panel.querySelector("#locationSpan").textContent = data.resolvedAddress;
        panel.querySelector("#timeSpan").textContent = WeatherData.GetCurrentTimeInTimezone(data.tzoffset).substring(0,5);

        panel.querySelector(".temperatureReading").textContent = today.temp;
        panel.querySelector("#feelsLikeSpan").textContent = `feels like ${today.feelslike}°`;

        /*
        let panel = DOM_Helper.AppendDivWithClasses(OverviewPanelsRoot, ["WeatherPanel"]);
        panel.id = index; // this needs to come from the backend, but

            let locationSpan = DOM_Helper.AppendSpan(panel, data.resolvedAddress);
            locationSpan.id = "locationSpan";
            let timeSpan = DOM_Helper.AppendSpan(panel, WeatherData.GetCurrentTimeInTimezone(data.tzoffset).substring(0,5));
            timeSpan.id = "timeSpan";

            let sideGrid = DOM_Helper.AppendDivWithClasses(panel, ["SideGrid"]);

                let CenteredImage = DOM_Helper.AppendDivWithClasses(sideGrid, ["CenteredImage"]);
                    let img = DOM_Helper.AppendTag(CenteredImage, "img");
                    img.src = imgSnow;
                    img.id = "conditionImg";

                let rightDiv = DOM_Helper.AppendDivWithClasses(sideGrid, []);
                    let WeatherPanelMainTemperature = DOM_Helper.AppendDivWithClasses(rightDiv, ["WeatherPanelMainTemperature"]);
                        DOM_Helper.AppendSpan(WeatherPanelMainTemperature, "6.9", ["temperatureReading"]);
                        DOM_Helper.AppendSpan(WeatherPanelMainTemperature, "°", ["degreesFloating"]);

                    DOM_Helper.AppendSpan(rightDiv, "feels like --");
        */

    }

    function CreateBlankWeatherOverviewPanel(index = -1) {

        let panel = DOM_Helper.AppendDivWithClasses(OverviewPanelsRoot, ["WeatherOverviewPanel"]);
        panel.id = index; // this needs to come from the backend, but

            let locationSpan = DOM_Helper.AppendSpan(panel, "-");
            locationSpan.id = "locationSpan";
            let timeSpan = DOM_Helper.AppendSpan(panel, "-");
            timeSpan.id = "timeSpan";

            let sideGrid = DOM_Helper.AppendDivWithClasses(panel, ["SideGrid"]);

                let CenteredImage = DOM_Helper.AppendDivWithClasses(sideGrid, ["CenteredImage"]);
                    let img = DOM_Helper.AppendTag(CenteredImage, "img");
                    img.src = imgUnknown;
                    img.id = "conditionImg";

                let rightDiv = DOM_Helper.AppendDivWithClasses(sideGrid, ["CenteredImage"]);
                    let WeatherPanelMainTemperature = DOM_Helper.AppendDivWithClasses(rightDiv, ["WeatherPanelMainTemperature"]);
                        DOM_Helper.AppendSpan(WeatherPanelMainTemperature, "-", ["temperatureReading"]);
                        DOM_Helper.AppendSpan(WeatherPanelMainTemperature, "°", ["degreesFloating"]);

                    let feelsLike = DOM_Helper.AppendSpan(rightDiv, "-");
                    feelsLike.id = "feelsLikeSpan";

        return panel;

    }


    return {
        TestFunction,
        CreateOverviewPanels,
    };

})();
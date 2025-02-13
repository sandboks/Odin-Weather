/*
Class to handle HTML manipulation, reading and interpreting it
*/

/* import the WeatherData class for data collection when triggered by the user */
import { WeatherData } from "./weather.js";
import { DOM_Helper } from "./domHelper.js";
import { UserData } from "./userData.js";

//import imgSnow from "./img/weather/wi_snowman.svg";
import imgUnknown from "./img/weather/cloud-question-outline.svg";
import imgSunny from "./img/weather/clearDay.png";
import imgSnow from "./img/weather/snow.png";
import imgCloud from "./img/weather/cloud.png";
import imgRain from "./img/weather/rain.png";

export const DOM_Controller = (function () {
    const OverviewPanelsRoot = document.querySelector(".PanelGrid");
    const OverviewRoot = document.querySelector("#overviewSection");
    const DetailsRoot = document.querySelector("#detailsSection");

    const AddNewPanelButton = document.querySelector(".AddNewPanelButton");
    const dialogParentDiv = document.querySelector(".dialogParentDiv");
    const panelCloseButton = document.querySelector("#panelCloseButton");
    const dialogBackdrop = document.querySelector(".dialogBackdrop");

    //let userData = new UserDataClass();
    
    async function TestFunction() {
        console.log("Hello, world");
        //console.log(userData.Get12hour());
        SwitchToOverview();
        AddEventListeners();
    }

    function AddEventListeners() {

        AddNewPanelButton.addEventListener('click', () => {
            OpenNewPanelDialog();
        });


        panelCloseButton.addEventListener('click', () => {
            CloseNewPanelDialog();
        });

        dialogBackdrop.addEventListener('click', () => {
            CloseNewPanelDialog();
        });
    }

    function OpenNewPanelDialog() {
        dialogParentDiv.style.display = "flex";
    }

    function CloseNewPanelDialog() {
        dialogParentDiv.style.display = "none";
    }

    async function SwitchToDetails(location) {
        OverviewRoot.style.display = "none";
        DetailsRoot.style.display = "grid";

        let data = await WeatherData.GetWeatherDataFromLocation(location);
        InsertDataIntoDetailsPage(data);

    }

    function SwitchToOverview() {
        OverviewRoot.style.display = "grid";
        DetailsRoot.style.display = "none";
    }

    function InsertDataIntoDetailsPage(data) {
        console.log(data);

        let today = data.days[0];

        const locationSpan = document.querySelector("#detailsSection #locationSpan");
        const dateSpan = document.querySelector("#detailsSection #dateSpan");
        const timeSpan = document.querySelector("#detailsSection #timeSpan");
        locationSpan.textContent = data.resolvedAddress;
        dateSpan.textContent = new Date(today.datetime).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', });
        timeSpan.textContent = WeatherData.GetCurrentTimeInTimezone(data.tzoffset);

        const temperatureReading = document.querySelector("#detailsSection .temperatureReading");
        temperatureReading.textContent = today.temp;

        const feelsLikeSpan = document.querySelector("#detailsSection #feelsLikeSpan");
        feelsLikeSpan.textContent = `feels like ${today.feelslike}°`;

        const TemperatureUnitsSymbol = document.querySelector("#detailsSection .TemperatureUnitsSymbol");
        TemperatureUnitsSymbol.textContent = "c";

        const conditionImg = document.querySelector("#detailsSection #conditionImg");
        ApplyConditionsImage(conditionImg, today.conditions);
        
    }

    function ApplyConditionsImage(conditionImg, todaysConditions) {
        const conditions = [
            ["CLEAR", imgSunny],
            ["CLOUDY", imgCloud],
            ["RAIN", imgRain],
            ["SNOW", imgSnow],
        ];

        console.log(todaysConditions.toUpperCase());

        for (let i = 0; i < conditions.length; i++) {
            let condition = conditions[i];
            if (todaysConditions.toUpperCase().includes(condition[0])) {
                conditionImg.src = condition[1];
            }   
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
        panel.querySelector("#timeSpan").textContent = WeatherData.GetCurrentTimeInTimezone(data.tzoffset, UserData.GetUse12Hour());

        panel.querySelector(".temperatureReading").textContent = today.temp;
        panel.querySelector("#feelsLikeSpan").textContent = `feels like ${today.feelslike}°`;
        panel.querySelector(".TemperatureUnitsSymbol").textContent = UserData.GetTemperatureSymbol();


        console.log(data.resolvedAddress);
        ApplyConditionsImage(panel.querySelector("#conditionImg"), today.conditions);

        panel.addEventListener('click', () => {
            SwitchToDetails(location);
        });

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
                        DOM_Helper.AppendSpan(WeatherPanelMainTemperature, "c", ["TemperatureUnitsSymbol"]);

                    let feelsLike = DOM_Helper.AppendSpan(rightDiv, "-");
                    feelsLike.id = "feelsLikeSpan";

        return panel;

    }


    return {
        TestFunction,
        CreateOverviewPanels,
    };

})();
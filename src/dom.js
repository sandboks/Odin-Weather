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
    const addNewLocationDialog = document.querySelector("#addNewLocationDialog");
    const DialogCloseButton = addNewLocationDialog.querySelector("#DialogCloseButton");
    const dialogBackdrop = document.querySelector(".dialogBackdrop");
    const AddNewLocationButton = document.querySelector("#AddNewLocationButton");
    const userSearchInput = document.querySelector("#userSearchInput");
    const searchErrorText = document.querySelector("#searchErrorText");
    const ReturnToOverviewButton = document.querySelector("#ReturnToOverviewButton");

    const SettingsDialog = document.querySelector("#SettingsDialog");
    const SettingsButton = document.querySelector("#SettingsButton");

    const UnitsToggle = document.querySelector("#UnitsToggle");
    const TimeToggle = document.querySelector("#TimeToggle");

    //let userData = new UserDataClass();

    let _searchInProgress = false;
    
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

        DialogCloseButton.addEventListener('click', () => {
            CloseNewPanelDialog();
        });

        AddNewLocationButton.addEventListener('click', () => {
            if (_searchInProgress)
                return;
            PerformLocationSearch();
        });

        ReturnToOverviewButton.addEventListener('click', () => {
            SwitchToOverview();
        })

        addNewLocationDialog.addEventListener('click', (event) => {
            var rect = addNewLocationDialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                CloseNewPanelDialog();
            }
        });

        SettingsButton.addEventListener('click', () => {
            OpenSettingsDialog();
        });

        AddListenersToDialog(SettingsDialog);
    }

    function OpenNewPanelDialog() {
        userSearchInput.value = "";
        addNewLocationDialog.showModal();
        //dialogParentDiv.style.display = "flex";
    }

    function CloseNewPanelDialog() {
        if (_searchInProgress)
            return;
        addNewLocationDialog.close();
        //dialogParentDiv.style.display = "none";
    }

    async function PerformLocationSearch() {
        _searchInProgress = true;

        AddNewLocationButton.textContent = "Searching...";
        searchErrorText.textContent = "";

        console.log(userSearchInput.textContent);
        let data = await WeatherData.GetWeatherDataFromLocation(userSearchInput.value);

        if (data == null) {
            searchErrorText.textContent = "Location could not be found."
            console.log(userSearchInput.value);
            _searchInProgress = false;
        }
        else {
            let panel = CreateBlankWeatherOverviewPanel();
            InsertDataIntoOverviewPanel(panel, data);
            _searchInProgress = false;
            userSearchInput.value = "";
            CloseNewPanelDialog();
        }

        AddNewLocationButton.textContent = "Add";
    }

    function OpenSettingsDialog() {
        SettingsDialog.showModal();
    }

    function AddListenersToDialog(dialog) {
        let CloseButton = dialog.querySelector("#DialogCloseButton");
        CloseButton.addEventListener('click', (event) => {
            dialog.close();
        });

        dialog.addEventListener('click', (event) => {
            var rect = dialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialog.close();
            }
        });

        let Toggles = dialog.querySelectorAll(".TwoOptionToggleBacking");
        for (let i = 0; i < Toggles.length; i++) {
            let toggle = Toggles[i];
            toggle.addEventListener('click', () => {
                ClickToggle(toggle);
            });    
        }
    }

    function ClickToggle(toggle) {
        let TwoOptionToggleHighlight = toggle.querySelector(".TwoOptionToggleHighlight");
        if (TwoOptionToggleHighlight.classList.contains("Clicked")) {
            TwoOptionToggleHighlight.classList.remove("Clicked");
        }
        else {
            TwoOptionToggleHighlight.classList.add("Clicked");
        }

        //console.log(toggle.id);
        switch (toggle.id) {
            case "UnitsToggle":
                UserData.ToggleUnits();
                RefreshDataFormat();
                break;
            case "TimeToggle":
                UserData.ToggleTimeFormat();
                RefreshDataFormat();
                break;
        }
    }

    async function SwitchToDetails(data) {
        OverviewRoot.style.display = "none";
        DetailsRoot.style.display = "grid";

        //let data = await WeatherData.GetWeatherDataFromLocation(location);
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

        //console.log(todaysConditions.toUpperCase());

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

    async function CreateOverviewPanels(list) {
        await list.forEach(locationString => { 
            CreateWeatherOverviewPanelAndFetchData(locationString, UserData.GenerateNewIndex());
        });
    }

    async function CreateWeatherOverviewPanelAndFetchData(location, index = -1) {
        //UserData.InsertNewPlace(location);
        
        let panel = CreateBlankWeatherOverviewPanel(index);

        let data = await WeatherData.GetWeatherDataFromLocation(location);
        UserData.InsertNewPlace(location, data);
        InsertDataIntoOverviewPanel(panel, data);
    }

    function InsertDataIntoOverviewPanel(panel, data) {

        let today = data.days[0];

        panel.querySelector("#locationSpan").textContent = data.resolvedAddress;
        panel.querySelector("#timeSpan").textContent = WeatherData.GetCurrentTimeInTimezone(data.tzoffset, UserData.GetUse12Hour());

        panel.querySelector(".temperatureReading").textContent = today.temp;
        panel.querySelector("#feelsLikeSpan").textContent = `feels like ${today.feelslike}°`;
        panel.querySelector(".TemperatureUnitsSymbol").textContent = UserData.GetTemperatureSymbol();


        //console.log(data.resolvedAddress);
        ApplyConditionsImage(panel.querySelector("#conditionImg"), today.conditions);

        panel.addEventListener('click', () => {
            SwitchToDetails(data);
        });
    }

    function CreateBlankWeatherOverviewPanel(index = -1) {

        let panel = DOM_Helper.InsertDivAtTop(OverviewPanelsRoot, ["WeatherOverviewPanel"]);
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

    function RefreshDataFormat() {
        let AllPanels = OverviewPanelsRoot.querySelectorAll(".WeatherOverviewPanel");
        for (let i = 0; i < AllPanels.length; i++) {
            let panel = AllPanels[i];

            let temperatureReading = panel.querySelector(".TemperatureUnitsSymbol");
            if (temperatureReading.textContent != UserData.GetTemperatureSymbol()) {
                console.log("need to update");

                temperatureReading.textContent = UserData.GetTemperatureSymbol();
                panel.querySelector(".temperatureReading").textContent = UserData.GetCurrentTemperature(panel.id);
                console.log(panel.id);
            }
        }
    }


    return {
        TestFunction,
        CreateOverviewPanels,
    };

})();
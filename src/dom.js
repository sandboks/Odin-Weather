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
    const DeleteUserDataButton = document.querySelector("#DeleteUserDataButton");

    //let userData = new UserDataClass();

    let _searchInProgress = false;
    let _currentPanel = null;

    function Initialize() {
        SetToggles();
        //console.log("Hello, world");
        //console.log(userData.Get12hour());
        SwitchToOverview();
        AddEventListeners();

        CreateOverviewPanels(UserData.GetSavedPlaces());
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

        DeleteUserDataButton.addEventListener('click', () => {
            UserData.DeleteAllData();
        });
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
        console.log("PERFORM SEARCH");
        UserData.DebugPrintouts();

        AddNewLocationButton.textContent = "Searching...";
        searchErrorText.textContent = "";

        console.log(userSearchInput.textContent);
        let data = await WeatherData.GetWeatherDataFromLocation(userSearchInput.value);

        if (data == null) {
            searchErrorText.textContent = "Location could not be found."
            //console.log(userSearchInput.value);
            _searchInProgress = false;
        }
        else {
            /*
            let panel = CreateBlankWeatherOverviewPanel(index, location);

            let data = await WeatherData.GetWeatherDataFromLocation(location);
            InsertDataIntoOverviewPanel(panel, data, index);
            */
            let index = UserData.GenerateNewIndex();
            let panel = CreateBlankWeatherOverviewPanel(index, userSearchInput.value);
            InsertDataIntoOverviewPanel(panel, data, index);
            _searchInProgress = false;
            userSearchInput.value = "";
            UserData.SaveData();
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

    function SetToggles() {
        //console.log(`${UserData.GetUseCelcius()} / ${UserData.GetUse12Hour()}`);
        let UnitsToggleHighlight = document.querySelector("#UnitsToggle .TwoOptionToggleHighlight");
        if (!UserData.GetUseCelcius()) {
            UnitsToggleHighlight.classList.add("Clicked");
        }
        let TimeToggleHighlight = document.querySelector("#TimeToggle .TwoOptionToggleHighlight");
        if (UserData.GetUse12Hour())
            TimeToggleHighlight.classList.add("Clicked");
    }

    async function SwitchToDetails(panel) {
        OverviewRoot.style.display = "none";
        DetailsRoot.style.display = "grid";

        //let data = await WeatherData.GetWeatherDataFromLocation(location);
        _currentPanel = panel;
        InsertDataIntoDetailsPage(panel);

    }

    function SwitchToOverview() {
        OverviewRoot.style.display = "grid";
        DetailsRoot.style.display = "none";
        _currentPanel = null;
    }

    function InsertDataIntoDetailsPage(panel) {
        //console.log(data);
        console.log(panel.id);

        let data = UserData.FetchData(panel.id);
        let today = data.days[0];

        const locationSpan = document.querySelector("#detailsSection #locationSpan");
        const dateSpan = document.querySelector("#detailsSection #dateSpan");
        const timeSpan = document.querySelector("#detailsSection #timeSpan");
        locationSpan.textContent = data.resolvedAddress;
        dateSpan.textContent = new Date(today.datetime).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', });
        timeSpan.textContent = UserData.GetCurrentTimeByIndex(panel.id);

        const temperatureReading = document.querySelector("#detailsSection .temperatureReading");
        temperatureReading.textContent = UserData.GetCurrentTemperatureByIndex(panel.id);

        const feelsLikeSpan = document.querySelector("#detailsSection #feelsLikeSpan");
        feelsLikeSpan.textContent = `feels like ${today.feelslike}°`;

        document.querySelector("#detailsSection .TemperatureUnitsSymbol").textContent = UserData.GetTemperatureSymbol();

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

    async function CreateWeatherOverviewPanelAndFetchData(location, index) {
        console.log(location);
        let panel = CreateBlankWeatherOverviewPanel(index, location);

        let data = await WeatherData.GetWeatherDataFromLocation(location);
        InsertDataIntoOverviewPanel(panel, data, index);
    }

    function InsertDataIntoOverviewPanel(panel, data, index) {
        UserData.WriteData(index, data);

        let today = data.days[0];

        panel.querySelector("#locationSpan").textContent = data.resolvedAddress;
        panel.querySelector("#timeSpan").textContent = UserData.GetCurrentTimeByIndex(panel.id);

        panel.querySelector(".temperatureReading").textContent = UserData.GetCurrentTemperatureByIndex(index);
        panel.querySelector("#feelsLikeSpan").textContent = `feels like ${today.feelslike}°`;
        panel.querySelector(".TemperatureUnitsSymbol").textContent = UserData.GetTemperatureSymbol();


        //console.log(data.resolvedAddress);
        ApplyConditionsImage(panel.querySelector("#conditionImg"), today.conditions);

        panel.addEventListener('click', () => {
            SwitchToDetails(panel);
        });
    }

    function CreateBlankWeatherOverviewPanel(index, location) {

        UserData.InsertNewPlace(location);

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
        UserData.DebugPrintouts();
        
        let AllPanels = OverviewPanelsRoot.querySelectorAll(".WeatherOverviewPanel");
        for (let i = 0; i < AllPanels.length; i++) {
            let panel = AllPanels[i];
            //console.log(panel.id);

            let temperatureReading = panel.querySelector(".TemperatureUnitsSymbol");
            if (temperatureReading.textContent != UserData.GetTemperatureSymbol()) {

                temperatureReading.textContent = UserData.GetTemperatureSymbol();
                panel.querySelector(".temperatureReading").textContent = UserData.GetCurrentTemperatureByIndex(panel.id);
                //console.log(panel.id);
            }

            let timeSpan = panel.querySelector("#timeSpan");
            timeSpan.textContent = UserData.GetCurrentTimeByIndex(panel.id);
        }

        if (_currentPanel)
            InsertDataIntoDetailsPage(_currentPanel);


    }

    return {
        Initialize,
        CreateOverviewPanels,
    };

})();
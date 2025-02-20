/*
Class to handle user settings and saved data
*/

export const UserData = (function () {
    let useCelcius = true;
    let use12hour = false;

    let savedPlaces = [];
    let savedData = [];
    let _panelsCreated = 0;

    let _savingDisabled = false;

    function GetTemperatureSymbol() {
        return (useCelcius ? "C" : "F");
    }

    function GetTemperatureString() {
        return useCelcius ? "metric" : "metric"; //"us"
    }

    function GetCurrentTemperatureByIndex(index) {
        let temp = savedData[index].currentConditions.temp; //savedData[index].days[0].temp;
        if (!useCelcius)
            temp = celcToFahr(temp);
        return temp;
        //return savedData[_panelsCreated - index - 1].days[0].temp;
    }

    function GetCurrentFeelsLikeByIndex(index) {
        let temp = savedData[index].currentConditions.feelslike; //savedData[index].days[0].temp;
        if (temp == savedData[index].currentConditions.temp)
            return "";
        if (!useCelcius)
            temp = celcToFahr(temp);
        return `feels like ${temp}°`;
    }

    function GetCurrentTimeByIndex(index, options = { timeStyle: 'short', hour12: use12hour }) {
        if (savedData[index] == null)
            console.log("ERROR: NULL DATA");
        let timezone = savedData[index].tzoffset;

        // create Date object for current location
        var date = new Date();

        // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
        var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

        // create new Date object for a different timezone using supplied its GMT offset.
        var currentTime = new Date(utcTime + (3600000 * timezone));

        currentTime.getTimezoneOffset();
        //let returnString = (use12hour ? currentTime.toLocaleTimeString('en-US', options) : "");

        //console.log(`The time in this place is: ${currentTime.toLocaleTimeString()}`);

        return currentTime.toLocaleTimeString('en-US', options);
    }

    function celcToFahr(n) {
        return ((n * 9.0 / 5.0) + 32.0).toFixed(1);
    }

    function GetUse12Hour() {
        console.log(use12hour);
        return use12hour;
    }

    function GetUseCelcius() {
        console.log(useCelcius);
        return useCelcius;
    }
    function GetIsNightTimeByIndex(index) {
        let sunrise = savedData[index].currentConditions.sunrise; // "06:44:10"
        let sunset = savedData[index].currentConditions.sunset; //"17:36:08"

        let currentTime = GetCurrentTimeByIndex(index, {hour12: false});

        return !(sunrise <= currentTime && currentTime <= sunset);
    }

    function GetCompareTemperatureByIndex(index) {
        let data = savedData[index];
        let delta = (data.days[1].temp - data.days[0].temp).toFixed(1);

        if (Math.abs(delta) < 0.3) {
            return `About the same temperature`;
        }
        let magnitude = (Math.abs(delta) >= 3) ? "Much" : "Slightly";

        if (!useCelcius)
            delta = (celcToFahr(data.days[1].temp) - celcToFahr(data.days[0].temp)).toFixed(1);

        return `${magnitude} ${delta > 0 ? "warmer" : "colder"} (${delta}°)`;
    }

    function GetCompareUvByIndex(index) {
        let data = savedData[index];
        let delta = (data.days[1].uvindex - data.days[0].uvindex);

        if (Math.abs(delta) < 0.3) {
            return `Same peak UV (${data.days[1].uvindex})`;
        }
        let magnitude = (Math.abs(delta) >= 3) ? "Much" : "Slightly";

        return `${magnitude} ${delta > 0 ? "higher" : "lower"} peak UV (${delta})`;
    }

    // inserts a new place at the front of the list, so the latest one should always be at the top
    function InsertNewPlace(place) {
        //savedPlaces.unshift(place);
        savedPlaces.push(place);
        //savedData.unshift(data);
        savedData.push(null);
        console.log(savedPlaces);
    }

    function DeleteLocation(index) {
        DebugPrintouts();
        //array.splice(index, 1);
        savedPlaces.splice(index, 1);
        savedData.splice(index, 1);
        DebugPrintouts();
        console.log(index);
    }

    function WriteData(index, data) {
        savedData[index] = data;
    }

    function FetchData(index) {
        return savedData[index];
    }

    function FetchSearchName(index) {
        return savedPlaces[index];
    }

    function ResetIndexCount() {
        _panelsCreated = 0;
    }

    function GenerateNewIndex() {
        return _panelsCreated++;
    }

    function ToggleUnits() {
        useCelcius = !useCelcius;
        SaveData();
    }

    function ToggleTimeFormat() {
        use12hour = !use12hour;
        SaveData();
    }

    function DebugPrintouts() {
        console.log(savedPlaces);
        console.log(savedData);
    }

    /*
    LOCAL SAVE DATA
    */

    function Initialize() {
        // try loading data. If this succeeds, then don't load default values
        if (LoadData()) {
            return;
        }

        console.log("No save data present. Writing default values:");

        useCelcius = true;
        use12hour = false;
        
        //savedPlaces = ["tokyo", "sydney", "new york"];
        ["tokyo", "sydney", "new york"].forEach(location => {
            InsertNewPlace(location);
        });
        DebugPrintouts();
        //ShowInitialPopup();
    }

    function GetSavedPlaces() {
        return savedPlaces;
    }

    function SaveData() {
        if (_savingDisabled)
            return;
        
        localStorage.setItem("use12hour", use12hour);
        localStorage.setItem("useCelcius", useCelcius);
        localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));

        //DebugPrintouts();
        //console.log(JSON.stringify(savedPlaces));
        console.log("SAVE COMPLETE");
    }

    function LoadData() {
        if (localStorage.getItem("use12hour") == null)
            return false;
        
        use12hour = JSON.parse(localStorage.getItem("use12hour"));
        useCelcius = JSON.parse(localStorage.getItem("useCelcius"));
        savedPlaces = JSON.parse(localStorage.getItem("savedPlaces"));
        console.log("SAVE DATA LOADED");

        return true;
    }

    function DeleteAllData() {
        localStorage.clear();
        location.reload();
    }


    return {
        GetTemperatureSymbol,
        GetTemperatureString,
        GetUse12Hour,
        GetUseCelcius,
        GetSavedPlaces,
        InsertNewPlace,
        ResetIndexCount,
        GenerateNewIndex,
        ToggleUnits,
        ToggleTimeFormat,
        GetCurrentTemperatureByIndex,
        GetCurrentFeelsLikeByIndex,
        GetCurrentTimeByIndex,
        GetIsNightTimeByIndex,
        GetCompareTemperatureByIndex,
        GetCompareUvByIndex,
        WriteData,
        FetchData,
        FetchSearchName,
        DebugPrintouts,
        Initialize,
        SaveData,
        LoadData,
        DeleteAllData,
        DeleteLocation,
        //TestFunction,
    };

})();

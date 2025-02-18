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
        //console.log(_panelsCreated);
        console.log(index);
        let temp = savedData[index].days[0].temp;
        if (!useCelcius)
            temp = celcToFahr(temp);
        return temp;
        //return savedData[_panelsCreated - index - 1].days[0].temp;
    }

    function GetCurrentTimeByIndex(index) {
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
        let options = { timeStyle: 'short', hour12: use12hour };
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

    // inserts a new place at the front of the list, so the latest one should always be at the top
    function InsertNewPlace(place) {
        savedPlaces.unshift(place);
        //savedData.unshift(data);
        savedData.push(null);
        //console.log(savedPlaces);
    }

    function WriteData(index, data) {
        savedData[index] = data;
    }

    function FetchData(index) {
        return savedData[index];
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

        useCelcius = true;
        use12hour = false;
        console.log(savedPlaces);
        //console.log(["tokyo", "sydney", "new york"]);
        savedPlaces = ["tokyo", "sydney", "new york"];
        console.log(savedPlaces);
        //ShowInitialPopup();
    }

    function GetSavedPlaces() {
        return savedPlaces;
    }

    function SaveData() {
        if (_savingDisabled)
            return;
        
        //FrontEnd.ResyncFrontendToData(_currentQuest);

    //let savedPlaces = [];
    //let savedData = [];
    //let _panelsCreated = 0;

        localStorage.setItem("use12hour", use12hour);
        localStorage.setItem("useCelcius", useCelcius);
        localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
        localStorage.setItem("_panelsCreated", _panelsCreated);
        //localStorage.setItem("_quests", JSON.stringify(_quests));
        //localStorage.setItem("_currentQuest", (_currentQuest == null ? -1 : _currentQuest.id)); // store the ID
        //localStorage.setItem("_questsGenerated", (_questsGenerated));

        console.log("SAVE COMPLETE");
    }

    function LoadData() {
        if (localStorage.getItem("use12hour") == null)
            return false;
        
        use12hour = JSON.parse(localStorage.getItem("use12hour"));
        //console.log(user12hour);
        useCelcius = JSON.parse(localStorage.getItem("useCelcius"));
        savedPlaces = JSON.parse(localStorage.getItem("savedPlaces"));
        console.log("SAVE DATA LOADED");

        /*
        let userData = JSON.parse(localStorage.getItem("_userData"));
        //console.log(userData);
        if (userData == null)
            return false;
        else {
            let questsGenerated = localStorage.getItem("_questsGenerated");
            let questsData = JSON.parse(localStorage.getItem("_quests"));
            let currentQuestID = localStorage.getItem("_currentQuest");
            LoadGivenData(userData, questsData, questsGenerated, currentQuestID);
        }
        */
        return true;
    }

    function DeleteAllData() {
        //_doNotSave = true;
        localStorage.clear();
        // refresh the page
        location.reload();
    }


    return {
        GetTemperatureSymbol,
        GetTemperatureString,
        GetUse12Hour,
        GetUseCelcius,
        GetSavedPlaces,
        InsertNewPlace,
        GenerateNewIndex,
        ToggleUnits,
        ToggleTimeFormat,
        GetCurrentTemperatureByIndex,
        GetCurrentTimeByIndex,
        WriteData,
        FetchData,
        DebugPrintouts,
        Initialize,
        SaveData,
        LoadData,
        DeleteAllData,
        //TestFunction,
    };

})();

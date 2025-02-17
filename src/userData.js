/*
Class to handle user settings and saved data
*/

export const UserData = (function () {
    let use12hour = false;
    let useCelcius = true;

    let savedPlaces = [];
    let savedData = [];
    let _panelsCreated = 0;

    function GetTemperatureSymbol() {
        return (useCelcius ? "C" : "F");
    }

    function GetTemperatureString() {
        return useCelcius ? "metric" : "us";
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
        return use12hour;
    }

    // inserts a new place at the front of the list, so the latest one should always be at the top
    function InsertNewPlace(place) {
        savedPlaces.unshift(place);
        //savedData.unshift(data);
        savedData.unshift(null);
        console.log(savedPlaces);
    }

    function WriteData(index, data) {
        DebugPrintouts();
        console.log(index);
        console.log(data);
        savedData[index] = data;
        console.log(savedData);
    }

    function FetchData(index) {
        return savedData[index];
    }

    function GenerateNewIndex() {
        return _panelsCreated++;
    }

    function ToggleUnits() {
        useCelcius = !useCelcius;
    }

    function ToggleTimeFormat() {
        use12hour = !use12hour;
    }

    function DebugPrintouts() {
        console.log(savedPlaces);
        console.log(savedData);
    }


    return {
        GetTemperatureSymbol,
        GetTemperatureString,
        GetUse12Hour,
        InsertNewPlace,
        GenerateNewIndex,
        ToggleUnits,
        ToggleTimeFormat,
        GetCurrentTemperatureByIndex,
        GetCurrentTimeByIndex,
        WriteData,
        FetchData,
        DebugPrintouts,
        //TestFunction,
    };

})();

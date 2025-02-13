/*
Class to handle user settings and saved data
*/

export const UserData = (function () {
    let use12hour = false;
    let useCelcius = true;

    let savedPlaces = [];
    let _panelsCreated = 0;

    function GetTemperatureSymbol() {
        return (useCelcius ? "C" : "F");
    }

    function GetTemperatureString() {
        return useCelcius ? "metric" : "us";
    }

    function GetUse12Hour() {
        return use12hour;
    }

    // inserts a new place at the front of the list, so the latest one should always be at the top
    function InsertNewPlace(place) {
        savedPlaces.unshift(place);
        console.log(savedPlaces);
    }

    function GenerateNewIndex() {
        return _panelsCreated++;
    }


    return {
        GetTemperatureSymbol,
        GetTemperatureString,
        GetUse12Hour,
        InsertNewPlace,
        GenerateNewIndex,
        //TestFunction,
    };

})();

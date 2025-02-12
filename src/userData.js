/*
Class to handle user settings and saved data
*/

export const UserData = (function () {
    let use12hour = false;
    let useCelcius = true;

    function GetTemperatureSymbol() {
        return (useCelcius ? "C" : "F");
    }

    function GetTemperatureString() {
        return useCelcius ? "metric" : "us";
    }

    function GetUse12Hour() {
        return use12hour;
    }


    return {
        GetTemperatureSymbol,
        GetTemperatureString,
        GetUse12Hour,
        //TestFunction,
    };

})();

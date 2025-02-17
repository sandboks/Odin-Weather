import "./style.css";
import "./dialog.css";
// import { WeatherData } from "./weather.js";
import { DOM_Controller } from "./dom.js";

//WeatherData.PerformWeatherSearch("tokyo");
DOM_Controller.TestFunction();
//DOM_Controller.CreateOverviewPanels(["tokyo", "sydney", "auckland"]);
DOM_Controller.CreateOverviewPanels(["tokyo", "sydney", "auckland", "hawaii", "houston", "new york", "london"]);
import "./style.css";
import "./dialog.css";
import { DOM_Controller } from "./dom.js";
import { UserData } from "./userData.js";

//WeatherData.PerformWeatherSearch("tokyo");
UserData.Initialize();
DOM_Controller.Initialize();
DOM_Controller.TestFunction();
DOM_Controller.CreateOverviewPanels(["tokyo", "sydney", "new york"]);
//DOM_Controller.CreateOverviewPanels(["tokyo", "sydney", "auckland", "hawaii", "houston", "new york", "london"]);
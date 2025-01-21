/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather.js */ \"./src/weather.js\");\n\n\n_weather_js__WEBPACK_IMPORTED_MODULE_0__.WeatherData.TestFunction();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBMkM7O0FBRTNDLG9EQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2VhdGhlckRhdGEgfSBmcm9tIFwiLi93ZWF0aGVyLmpzXCI7XG5cbldlYXRoZXJEYXRhLlRlc3RGdW5jdGlvbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WeatherData: () => (/* binding */ WeatherData)\n/* harmony export */ });\n/*\nClass to handle weather API data, reading and interpreting it\n*/\n\nconst WeatherData = (function () {\n\n    function TestFunction() {\n        console.log(\"HELLO\");\n\n        GetWeatherDataFromLocation(\"tokyo\");\n    }\n\n    async function GetWeatherDataFromLocation(location) {\n        //let string = \"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tokyo?unitGroup=metric&include=days&key=VLJ2ZNYEW4LQATMDBET324BMR&contentType=json\";\n        let request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=VLJ2ZNYEW4LQATMDBET324BMR&contentType=json`;\n        //let data = null;\n\n        const response = await fetch(request, {mode: 'cors'});\n        const data = await response.json();\n        console.log(data);\n    }\n\n    return {\n        TestFunction,\n    };\n\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2VhdGhlci5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBOztBQUVPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkdBQTZHLFNBQVM7QUFDdEg7O0FBRUEsK0NBQStDLGFBQWE7QUFDNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL3dlYXRoZXIuanM/OGViMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ2xhc3MgdG8gaGFuZGxlIHdlYXRoZXIgQVBJIGRhdGEsIHJlYWRpbmcgYW5kIGludGVycHJldGluZyBpdFxuKi9cblxuZXhwb3J0IGNvbnN0IFdlYXRoZXJEYXRhID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIFRlc3RGdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIRUxMT1wiKTtcblxuICAgICAgICBHZXRXZWF0aGVyRGF0YUZyb21Mb2NhdGlvbihcInRva3lvXCIpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIEdldFdlYXRoZXJEYXRhRnJvbUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIC8vbGV0IHN0cmluZyA9IFwiaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvdG9reW8/dW5pdEdyb3VwPW1ldHJpYyZpbmNsdWRlPWRheXMma2V5PVZMSjJaTllFVzRMUUFUTURCRVQzMjRCTVImY29udGVudFR5cGU9anNvblwiO1xuICAgICAgICBsZXQgcmVxdWVzdCA9IGBodHRwczovL3dlYXRoZXIudmlzdWFsY3Jvc3NpbmcuY29tL1Zpc3VhbENyb3NzaW5nV2ViU2VydmljZXMvcmVzdC9zZXJ2aWNlcy90aW1lbGluZS8ke2xvY2F0aW9ufT91bml0R3JvdXA9bWV0cmljJmluY2x1ZGU9ZGF5cyZrZXk9VkxKMlpOWUVXNExRQVRNREJFVDMyNEJNUiZjb250ZW50VHlwZT1qc29uYDtcbiAgICAgICAgLy9sZXQgZGF0YSA9IG51bGw7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0LCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIFRlc3RGdW5jdGlvbixcbiAgICB9O1xuXG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/weather.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
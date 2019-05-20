/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var TxtType = function TxtType(el, toRotate, period) {\n  this.toRotate = toRotate;\n  this.el = el;\n  this.loopNum = 0;\n  this.period = parseInt(period, 10) || 2000;\n  this.txt = '';\n  this.tick();\n  this.isDeleting = false;\n};\n\nTxtType.prototype.tick = function () {\n  var i = this.loopNum % this.toRotate.length;\n  var fullTxt = this.toRotate[i];\n\n  if (this.isDeleting) {\n    this.txt = fullTxt.substring(0, this.txt.length - 1);\n  } else {\n    this.txt = fullTxt.substring(0, this.txt.length + 1);\n  }\n\n  this.el.innerHTML = '<span class=\"wrap\">' + this.txt + '</span>';\n  var that = this;\n  var delta = 200 - Math.random() * 100;\n\n  if (this.isDeleting) {\n    delta /= 2;\n  }\n\n  if (!this.isDeleting && this.txt === fullTxt) {\n    delta = this.period;\n    this.isDeleting = true;\n  } else if (this.isDeleting && this.txt === '') {\n    this.isDeleting = false;\n    this.loopNum++;\n    delta = 500;\n  }\n\n  setTimeout(function () {\n    that.tick();\n  }, delta);\n};\n\nwindow.onload = function () {\n  var elements = document.getElementsByClassName('typewrite');\n\n  for (var i = 0; i < elements.length; i++) {\n    var toRotate = elements[i].getAttribute('data-type');\n    var period = elements[i].getAttribute('data-period');\n\n    if (toRotate) {\n      new TxtType(elements[i], JSON.parse(toRotate), period);\n    }\n  } // INJECT CSS\n\n\n  var css = document.createElement(\"style\");\n  css.type = \"text/css\";\n  css.innerHTML = \".typewrite > .wrap { border-right: 0.08em solid #fff}\";\n  document.body.appendChild(css);\n};\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });
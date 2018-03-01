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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/super-iterator/0.1.0";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./doc/basic.demo.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__("./lib/index.js");
var data = {
    name: 'nimo',
    list: [{
        title: 'abc'
    }, {
        title: '123'
    }]
};
console.log('## forEach');
each.forEach(data, function (item, keys) {
    console.log(JSON.stringify(keys));
    console.log(item);
    console.log('\r\n');
});
console.log('## map');
var newData = each.map(data, function (item, keys) {
    switch (item.constructor) {
        case Object:
            item.debug = true;
            break;
        case Array:
            item.push('debug');
            break;
        case String:
            item = item + '-debug';
            break;
        case Number:

            break;
    }
    return item;
});
console.log(newData);

/***/ }),

/***/ "./lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var extend = __webpack_require__("./node_modules/extend/index.js");
function baseEach(parentKeys, data, callback) {
    if (Array.isArray(data)) {
        data.forEach(function (item, index) {
            action(item, index);
        });
    } else {
        Object.keys(data).forEach(function (key) {
            action(data[key], key);
        });
    }
    function action(target, key) {
        if (target.id) {
            key = target.id;
        }
        var keys = parentKeys.concat(key);
        var cloneKeys = extend(true, [], keys);
        callback(target, cloneKeys);
        // object and array
        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
            each(cloneKeys, target, callback);
        }
    }
}
function each(parentKeys, data, callback) {
    var keysMap = {};
    baseEach(parentKeys, data, function (item, keys) {
        keysMap[keys.join(',')] = true;
    });
    baseEach(parentKeys, data, function (item, keys) {
        if (keysMap[keys.join(',')]) {
            callback(item, keys);
        }
    });
}
module.exports = {
    forEach: function forEach(data, callback) {
        each([], data, callback);
    },
    map: function map(data, callback) {
        var cloneData = {};
        if (Array.isArray(data)) {
            cloneData = [];
        }
        cloneData = extend(true, cloneData, data);
        each([], cloneData, function (item, keys) {
            var cloneKeys = extend(true, [], keys);
            var result = callback(item, cloneKeys);
            var parentKeys = extend(true, [], cloneKeys);parentKeys.pop();
            var currentKey = cloneKeys[cloneKeys.length - 1];

            var target = cloneData;
            parentKeys.forEach(function (key) {
                target = target[key];
            });
            target[currentKey] = result;
        });
        return cloneData;
    }
};

/***/ }),

/***/ "./node_modules/extend/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./doc/basic.demo.js");


/***/ })

/******/ });
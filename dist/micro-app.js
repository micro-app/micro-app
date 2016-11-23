/*!
 * @ProjectName micro-app
 * @Version 1.0.1
 * @Author lixinliang(https://github.com/lixinliang)
 * @Update 2016-11-23 11:27:48 am
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["microApp"] = factory();
	else
		root["microApp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @webpack
	 * @library microApp
	 * @libraryTarget umd
	 */

	var doc = document;
	var head = doc.head;
	var define = Object.defineProperty.bind(Object);

	var userAgent = navigator.userAgent;

	/**
	 * The platform is ios or not
	 * @type {Boolean} ios
	 */
	var ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(userAgent);

	/**
	 * The device is mobile(iPhone and iPod) or not
	 * @type {Boolean} mobile
	 */
	var mobile = !/iPad/i.test(userAgent);

	/**
	 * The browser is safari or not
	 * @type {Boolean} safari
	 */
	var safari = /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent);

	/**
	 * The major version of os
	 * @type {Number} os
	 */
	var os = parseInt((userAgent.match(/\bcpu(?: iphone)? os /i.test(userAgent) ? /\bcpu(?: iphone)? os ([0-9._]+)/i : /\biph os ([0-9_]+)/i) || [, 0])[1]);

	/**
	 * Append the elemment
	 * @param {Element} elem target element
	 * @return {Element} elem target element
	 */
	var append = function append(elem) {
	    head.appendChild(elem);
	    return elem;
	};

	/**
	 * Define filter
	 * @param  {String} name filter name
	 * @param  {Function} method filter method
	 * @return {Object} this this
	 */
	function filter(name, method) {
	    if (typeof name != 'string' || typeof method != 'function') {
	        throw new TypeError('[micro-app] microApp.filter( name : String, method : Function );');
	    }
	    // let character = name.match(/[\||\(|\)]/);
	    var character = name.match(/\|/);
	    if (character) {
	        throw new TypeError('[micro-app] "' + character[0] + '" is not allowed.');
	    }
	    filter[name] = method;
	    return this;
	}

	/**
	 * Remove the elemment
	 * @param {Element} elem target element
	 */
	var remove = function remove(elem) {
	    head.removeChild(elem);
	};

	var icon = [
	// pad
	[
	// os <= 6
	[
	// low dpi
	'72x72',
	// high dpi
	'144x144'],
	// os >= 7
	[
	// low dpi
	'76x76',
	// high dpi
	'152x152']],
	// phone or pod
	[
	// os <= 6
	[
	// low dpi
	'57x57',
	// high dpi
	'114x114'],
	// os >= 7
	[
	// low dpi
	'60x60',
	// high dpi
	'120x120']]];

	var splash = {};
	var width = 'device-width';
	var height = 'device-height';
	if (mobile) {
	    splash[width] = 320;
	    splash[height] = 480;
	    [{
	        width: 320,
	        height: 568
	    }, {
	        width: 375,
	        height: 667
	    }, {
	        width: 414,
	        height: 736
	    }].forEach(function (type) {
	        if (matchMedia('(' + width + ':' + type.width + 'px)and(' + height + ':' + type.height + 'px)').matches) {
	            splash[width] = type.width;
	            splash[height] = type.height;
	        }
	    });
	    splash[width] += 'px';
	    splash[height] += 'px';
	} else {
	    splash[width] = '768px';
	    splash[height] = '1024px';
	}
	splash['-webkit-device-pixel-ratio'] = devicePixelRatio;

	/**
	 * Get the autosize config
	 * @param  {String} type icon/splash
	 * @return {Object} config config
	 */
	var autosize = function autosize(type) {
	    if (type == 'icon') {
	        var sizes = icon[+mobile][+(os > 6)][+(devicePixelRatio > 1)];
	        return { sizes: sizes };
	    }
	    if (type == 'splash') {
	        var result = [];
	        for (var rule in splash) {
	            result.push('(' + rule + ':' + splash[rule] + ')');
	        }
	        if (!mobile || devicePixelRatio == 3) {
	            var _rule = '(orientation:landscape)';
	            if (matchMedia(_rule).matches) {
	                result.push(_rule);
	            } else {
	                result.push('(orientation:portrait)');
	            }
	        }
	        var media = result.join('and');
	        return { media: media };
	    }
	};

	var container = doc.createElement('div');

	/**
	 * Create an element
	 * @param  {String} html html code
	 * @return {Element} elem result element
	 */
	var createElement = function createElement(html) {
	    container.innerHTML = html;
	    return container.firstElementChild;
	};

	var microApp = doc.querySelector('script[micro-app]') || append(createElement('<script micro-app>'));

	/**
	 * Define static property
	 * @param {Object} target target object
	 * @param {String} name property name
	 * @param {AnyType} value property value
	 */
	var defineProperty = function defineProperty(target, name, value) {
	    return define(target, name, {
	        value: value,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	};

	/**
	 * Override a function on microApp
	 * @param  {String} name function name
	 * @param  {Function} handler function body
	 */
	var override = function override(name, handler) {
	    var method = microApp[name];
	    // Reset the method name
	    defineProperty(microApp, name, defineProperty(defineProperty(function () {
	        // `bubbles` as a flag
	        var bubbles = true;
	        var result = handler.call(this, {
	            stopPropagation: function stopPropagation() {
	                bubbles = false;
	            }
	        }, arguments);
	        // Interrupt the function chain by `event.stopPropagation` and give the `result` as return value
	        return bubbles ? method.apply(this, arguments) : result;
	    }, 'name', name), 'toString', function toString() {
	        return 'function ' + name + '() { [native code] }';
	    }));
	};

	var _Element$prototype = Element.prototype;
	var setAttribute = _Element$prototype.setAttribute;
	var removeAttribute = _Element$prototype.removeAttribute;

	/**
	 * Set or remove an attribute
	 * @param {Element} elem target element
	 * @param {String} attribute attribute name
	 * @param {AnyType} value attribute value
	 */

	var setAttribute$1 = function setAttribute$1(elem, attribute, value) {
	    if (value === null) {
	        removeAttribute.call(elem, attribute);
	    } else {
	        setAttribute.call(elem, attribute, value);
	    }
	};

	/**
	 * Define property and listen change of value on microApp
	 * @param  {String_Array} name String or Array like [property name, attribute name]
	 * @param  {Function} onChange callback
	 */
	function defineAttribute(name, onChange) {
	    // propertyName should be camel case, attributeName should be hyphen case
	    var propertyName = void 0;
	    var attributeName = void 0;
	    if (typeof name == 'string') {
	        propertyName = attributeName = name;
	    } else {
	        propertyName = name[0];
	        attributeName = name[1];
	    }
	    // Get defaults from attribute
	    var value = microApp.getAttribute(attributeName);
	    if (value !== null) {
	        onChange(attributeName, value, null);
	    }
	    // Getter, setter
	    var propertyConfig = {
	        get: function get() {
	            return value;
	        },
	        set: function set(newValue) {
	            if (newValue !== value) {
	                // the value is diffrent from old value
	                onChange(attributeName, newValue, value);
	            }
	            return value = newValue;
	        },

	        enumerable: false
	    };
	    define(microApp, propertyName, propertyConfig);
	    // Mark down the property name
	    defineAttribute[propertyName] = true;
	    // Both define camel and hyphen
	    if (propertyName != attributeName) {
	        define(microApp, attributeName, propertyConfig);
	        // Mark down the property name
	        defineAttribute[attributeName] = true;
	    }
	}

	var defaultArrayValue = {}.toString.call([]);
	var defaultBase64Value = '[object Base64]';

	/**
	 * Create multiple elements
	 * @param  {String} code html code
	 * @param  {String} attributeName an default attribute name
	 * @return {Function} func onChange of `defineAttribute`
	 */
	var createMultiElement = function createMultiElement(code, attributeName) {
	    // Previous items
	    var previousItems = [];

	    // onChange
	    return function (name, value, previous) {
	        // Format to `Array`
	        var currentItems = value instanceof Array ? value.slice(0) : value === null ? [] : [value];

	        // Clear old elements
	        previousItems.forEach(function (element) {
	            remove(element);
	        });
	        previousItems = [];

	        // Create new elements
	        var length = currentItems.length;
	        for (var i = 0; i < length; i++) {
	            var _value = currentItems[i];
	            if (_value !== null) {
	                (function () {
	                    // Create element
	                    var element = createElement(code);
	                    if (_value instanceof Object) {
	                        // `attributeName` should be `undefined` defaults
	                        setAttribute$1(element, attributeName, void 0);
	                        for (var key in _value) {
	                            setAttribute$1(element, key, _value[key]);
	                        }
	                    } else {
	                        setAttribute$1(element, attributeName, _value);
	                    }
	                    // Safari can not parse the img url includes '#'
	                    var attributeValue = element.getAttribute(attributeName);
	                    if (attributeValue.indexOf('#') > -1) {
	                        (function () {
	                            var temp = attributeValue.split('#');
	                            setAttribute$1(element, attributeName, temp[0]);
	                            setAttribute$1(element, 'filter', temp[1]);
	                            var interrupt = false;
	                            temp[1].split('|').forEach(function (filterName) {
	                                if (interrupt) {
	                                    return;
	                                }
	                                var filterMethod = filter[filterName];
	                                if (filterMethod) {
	                                    interrupt = filterMethod.call(element) === false;
	                                }
	                            });
	                        })();
	                    }
	                    // Save the element
	                    previousItems.push(append(element));
	                })();
	            }
	        }

	        // Set value as attribute
	        setAttribute$1(microApp, name, value instanceof Array ? defaultArrayValue : /^data:image/.test(value) ? defaultBase64Value : value);
	    };
	};

	// Version
	defineProperty(microApp, 'version', '1.0.1');

	// Define a filter by `microApp.filter`
	defineProperty(microApp, 'filter', filter);

	if (ios && safari) {
	    (function () {

	        // A filter of `precomposed`
	        microApp.filter('precomposed', function () {
	            this.rel = 'apple-touch-icon-precomposed';
	        })

	        // A filter of `autosize`
	        .filter('autosize', function () {
	            var type = this.getAttribute('rel') == 'apple-touch-startup-image' ? 'splash' : 'icon';
	            var attributes = autosize(type);
	            if (attributes) {
	                for (var attributeName in attributes) {
	                    this.setAttribute(attributeName, attributes[attributeName]);
	                }
	            }
	        });

	        // Capable, `null` equates disable, others will change to enable
	        var capable = createElement('<meta name="apple-mobile-web-app-capable" content="yes">');
	        defineAttribute('capable', function (name, value, previous) {
	            setAttribute$1(microApp, name, value);
	            if (value === null) {
	                remove(capable);
	            }
	            if (previous === null) {
	                append(capable);
	            }
	        });

	        // StatusBarStyle, normally, the value is one of `black-translucent`,`black`,`white`
	        var statusBarStyle = createElement('<meta name="apple-mobile-web-app-status-bar-style">');
	        defineAttribute(['statusBarStyle', 'status-bar-style'], function (name, value, previous) {
	            setAttribute$1(microApp, name, value);
	            setAttribute$1(statusBarStyle, 'content', value);
	            if (value === null) {
	                remove(statusBarStyle);
	            }
	            if (previous === null) {
	                append(statusBarStyle);
	            }
	        });

	        // Title, the app's name
	        var title = createElement('<meta name="apple-mobile-web-app-title">');
	        defineAttribute('title', function (name, value, previous) {
	            setAttribute$1(microApp, name, value);
	            setAttribute$1(title, 'content', value);
	            if (value === null) {
	                remove(title);
	            }
	            if (previous === null) {
	                append(title);
	            }
	        });

	        // Icon, the cover of app
	        defineAttribute('icon', createMultiElement('<link rel="apple-touch-icon">', 'href'));

	        // Splash, the start up image
	        defineAttribute('splash', createMultiElement('<link rel="apple-touch-startup-image">', 'href'));

	        // Override the method `getAttribute`
	        override('getAttribute', function (event, args) {
	            var name = args[0];
	            if (microApp === this && name in defineAttribute) {
	                // This attribute is defined
	                event.stopPropagation();
	                return microApp[name];
	            }
	        });

	        // Override the method `setAttribute`
	        override('setAttribute', function (event, args) {
	            var name = args[0];
	            var value = args[1];
	            if (microApp === this && name in defineAttribute) {
	                // This attribute is defined
	                event.stopPropagation();
	                return microApp[name] = value;
	            }
	        });

	        // Override the method `removeAttribute`
	        override('removeAttribute', function (event, args) {
	            var name = args[0];
	            if (microApp === this && name in defineAttribute) {
	                // This attribute is defined
	                event.stopPropagation();
	                return microApp[name] = null;
	            }
	        });
	    })();
	}

	module.exports = window.microApp = microApp;

	// 尚存问题
	// 1. 点击分享按钮后 Safari会检索页面对应meta标签并且写入变量存储 无论点击分享按钮多少次以及后续操作包括添加到桌面 都不会重新修改变量 导致icon无法动态修改
	// 2. 添加bookmark或者favorite后 点击分享按钮 应用icon会根据 添加到bookmark时为准 而不会去检索页面的meta标签

	// 体验优化
	// 1. 用户安装时触发的事件
	// 2. 增加删除描述文案
	// 3. 提供原生交互
	// 3.1 应用的3Dtouch快捷方式
	// 3.2 消息推送
	// 3.3 应用进入后台事件(Home键)
	// 3.4 应用返回前台事件

/***/ }
/******/ ])
});
;
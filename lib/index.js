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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compiler/index.js":
/*!*******************************!*\
  !*** ./src/compiler/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return compiler; });\n/* harmony import */ var _observe_Watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe/Watcher */ \"./src/observe/Watcher.js\");\n/**\n *  编译函数\n */\n\n\n\nclass compiler {\n    // 第三步，构建模板\n    constructor(el, vm) {\n        vm.$el = document.querySelector(el);\n        this.replace(vm.$el, vm);\n    }\n\n    // 替换函数\n    replace(el, vm) {\n        Array.from(el.childNodes).forEach(node => {\n            let text = node.textContent;\n            let reg = /\\{\\{(.*?)\\}\\}/g; // reg for {{}}\n\n            // 文本节点\n            if (node.nodeType === 3 && reg.test(text)) {\n                let arr = RegExp.$1.trim().split('.');\n                // 递归找到对应值\n                let val = vm;\n                arr.forEach(key => {\n                    val = val[key];\n                });\n                // 替换\n                node.textContent = text.replace(reg, val).trim();\n\n                // 当值变动的时候更新的watcher，初始化\n                new _observe_Watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vm, RegExp.$1, newVal => {\n                    node.textContent = text.replace(reg, newVal).trim();\n                });\n            }\n\n            // 针对input做双向绑定\n            if (node.nodeType === 1) {\n                let attr = node.attributes;\n                Array.from(attr).forEach(a => {\n                    if (!a.name.includes('v-')) {\n                        return;\n                    }\n                    let exp = a.value;\n                    let arr = exp.trim().split('.');\n                    // 初始化把input的值设上\n                    if (a.name.includes('v-')) {\n                        let val = vm;\n                        arr.forEach((key, i) => {\n                            if (i === arr.length - 1) {\n                                node.value = val[key];\n                                return;\n                            }\n                            val = val[key];\n                        });\n                    }\n                    // 更新值的时候反向更新\n                    new _observe_Watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vm, exp, newVal => {\n                        node.value = newVal;\n                    });\n                    // input的时候更新值\n                    node.addEventListener('input', e => {\n                        let newVal = e.target.value;\n\n                        // 递归找到对应值\n                        let val = vm;\n                        arr.forEach((key, i) => {\n                            if (i === arr.length - 1) {\n                                val[key] = newVal;\n                                return;\n                            }\n                            val = val[key];\n                        });\n                    });\n                });\n            }\n\n            // 继续替换子节点\n            if (node.childNodes && node.childNodes.length) {\n                this.replace(node, vm);\n            }\n        });\n    }\n}\n\n//# sourceURL=webpack:///./src/compiler/index.js?");

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Nue; });\n/* harmony import */ var _instance_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance/init */ \"./src/instance/init.js\");\n/* harmony import */ var _instance_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance/proxy */ \"./src/instance/proxy.js\");\n/* harmony import */ var _compiler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compiler */ \"./src/compiler/index.js\");\n// Test Nue\n\n\n\n\nclass Nue {\n    constructor(options = {}) {\n        // vm就代表框架对象\n        const vm = this;\n        this.$options = options;\n        // init option\n        Object(_instance_init__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vm);\n        // proxy data\n        Object(_instance_proxy__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(vm);\n\n        new _compiler__WEBPACK_IMPORTED_MODULE_2__[\"default\"](options.el, vm);\n    }\n}\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/core.js\");\n\n\nwindow.Nue = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/instance/init.js":
/*!******************************!*\
  !*** ./src/instance/init.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return init; });\n/* harmony import */ var _observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observe */ \"./src/observe/index.js\");\n\n\nfunction init(vm) {\n    let data = vm._data = vm.$options.data;\n    Object(_observe__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(data);\n}\n\n//# sourceURL=webpack:///./src/instance/init.js?");

/***/ }),

/***/ "./src/instance/proxy.js":
/*!*******************************!*\
  !*** ./src/instance/proxy.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return proxy; });\n/* \n    代码实现的第二步\n    简单数据代理 让 vm._data.a 变成 vm.a \n */\n\nfunction proxy(vm) {\n    for (let key in vm._data) {\n        proxyProperty(vm, '_data', key);\n    }\n}\n// proxy function\nfunction proxyProperty(target, sourceKey, key) {\n    Object.defineProperty(target, key, {\n        configurable: true,\n        get() {\n            return target[sourceKey][key];\n        },\n        set(newVal) {\n            target[sourceKey][key] = newVal;\n        }\n    });\n}\n\n//# sourceURL=webpack:///./src/instance/proxy.js?");

/***/ }),

/***/ "./src/observe/Dep.js":
/*!****************************!*\
  !*** ./src/observe/Dep.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\n/* \n    第三步，订阅器队列\n*/\nclass Dep {\n    constructor() {\n        // 订阅队列\n        this.subs = [];\n    }\n\n    // 订阅\n    addSub(sub) {\n        this.subs.push(sub);\n    }\n    // 广播\n    notify() {\n        for (let sub of this.subs) {\n            sub.update();\n        }\n    }\n\n    addDepend() {\n        Dep.target.addDep(this);\n    }\n}\n\nDep.target = null;\n\n//# sourceURL=webpack:///./src/observe/Dep.js?");

/***/ }),

/***/ "./src/observe/Watcher.js":
/*!********************************!*\
  !*** ./src/observe/Watcher.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _Dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep */ \"./src/observe/Dep.js\");\n/**\n * Watcher 订阅者\n */\n\n\nclass Watcher {\n    constructor(vm, expression, cb) {\n        this.vm = vm;\n        this.cb = cb;\n        this.expression = expression; // 需要替换的值\n        this.value = this.getValue();\n\n        _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = this;\n\n        let arr = expression.trim().split('.');\n        let val = vm;\n        arr.forEach(key => {\n            val = val[key]; // 此时回调用 数据劫持的get方法，pushu一个执行事件\n        });\n\n        _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = null;\n    }\n\n    getValue() {}\n\n    update() {\n        let arr = this.expression.trim().split('.');\n        let val = this.vm;\n        arr.forEach(key => {\n            val = val[key]; // 此时回调用 数据劫持的get方法，pushu一个执行事件\n        });\n        this.cb(val);\n    }\n}\n\n//# sourceURL=webpack:///./src/observe/Watcher.js?");

/***/ }),

/***/ "./src/observe/index.js":
/*!******************************!*\
  !*** ./src/observe/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return observe; });\n/* harmony import */ var _Dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep */ \"./src/observe/Dep.js\");\n/*\n    数据劫持，整个框架的第一步\n*/\n\n\nclass Observe {\n\n    constructor(data) {\n        this.dep = new _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.walk(data);\n    }\n\n    walk(data) {\n        let dep = this.dep;\n        for (let key in data) {\n            // 递归可能对象，全部属性使用defineProperty\n            observe(data[key]);\n            // 添加\n            let val = data[key];\n            Object.defineProperty(data, key, {\n                configurable: true,\n                get() {\n                    _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target && dep.addSub(_Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target);\n                    return val;\n                },\n                set(newVal) {\n                    if (val === newVal) return;\n                    val = newVal;\n                    // 新值是对象继续递归observe\n                    observe(newVal);\n                    // 所有数据更新\n                    dep.notify();\n                }\n            });\n        }\n    }\n}\n\nfunction observe(data) {\n    if (data && typeof data === 'object') return new Observe(data);\n    // function 如果不return是会保留再堆栈里？\n    return;\n}\n\n//# sourceURL=webpack:///./src/observe/index.js?");

/***/ })

/******/ });
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var forEach = global.Array.prototype.forEach;

function isNullOrUndefined(value) {
    return [undefined, null].indexOf(value) >= 0;
}

const Event = function (nodeList) {
    this.nodeList = global.Array.prototype.slice.call(nodeList);
};

const proto = Event.prototype;

proto.on = function on(event, callback) {
    return this.each(function (el) {
        this.addEventListener(event, callback.bind(this), false);
    });
};

proto.off = function off(event, callback) {
    return this.each(function (el) {
        callback ? this.removeEventListener(event, callback.bind(this)) : el.removeEventListener(event);
    });
};

proto.attr = function attr(argument1, argument2) {

    if (typeof argument1 === 'object') {

        var object = argument1;

        this.each(function () {

            for (var key in object) {

                var value = object[key];
                
                isNullOrUndefined(value) ? this.removeAttribute(key) : this.setAttribute(key, value);
            }
        });

        return this;
    } 

    var name = argument1;

    this.each(function (el, index) {

        var value = argument2;

        if (isNullOrUndefined(value)) {

            return el.removeAttribute(name);

        } else if (typeof value === 'function') {

            value = value.call(el, el.getAttribute(name), el, index);

            isNullOrUndefined(value) || el.setAttribute(name, value);

        } else {

            el.setAttribute(name, value);
        }
    });

    return this;
};

proto.prop = function prop(name, value) {

    var callback = function (el, index) {

        if (isNullOrUndefined(value)) {

            delete el[name];

        } else if (typeof value === 'function') {

            var result = value.call(el, el[name], el, index);

            if (isNullOrUndefined(result)) return;

            el[name] = result;

        } else {
            
            el[name] = value;
        }
    };

    return this.each(callback);
};

proto.each = function (callback) {
    forEach.call(this.nodeList, function (el, index) {
        callback.call(el, el, index);
    });
    return this;
};

module.exports = Event;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
const JotEvent = require('./Event');

window.Jot = {

    isReady: false,

    element: function (query, context) {

        if (! (context instanceof HTMLElement)) {
            context = document;
        }

        var nodeList = context.querySelectorAll(query);

        return new JotEvent(nodeList); 
    },

    ready : function (callback) {

        if (this.isReady) {

            callback();

            return;
        }


        var trigger = function trigger() {

            trigger.isCalled || callback();

            trigger.isCalled = true;
            
        }.bind(this);

        if (/complete|interactive/i.test(document.readyState)) {
            trigger();
        } else {
            document.addEventListener('DOMContentLoaded', trigger);
            document.addEventListener('load', trigger);
        }
    }
}
},{"./Event":1}]},{},[2])
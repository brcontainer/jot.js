(function (global) {
    
    "use strict";

    var forEach = global.Array.prototype.forEach;

    function isNullOrUndefined(value) {
        return [undefined, null].indexOf(value) >= 0;
    }
    
    var Event = function (nodeList) {
        this.nodeList = global.Array.prototype.slice.call(nodeList);
    };

    var proto = Event.prototype;
    
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



    
    global.JotEvent = Event;
    
})(this);
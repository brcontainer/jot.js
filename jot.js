/*
 * Jot.js 0.0.1
 *
 * Copyright (c) 2018 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

(function (d, w, u) {
    "use strict";

    var isReady = false;

    w.Jot = {
        'qsa': function (query, context) {
            return (context || document).querySelector(query);
        },
        'qs': function (query, context) {
            return (context || document).querySelectorAll(query);
        },
        'ready': function (callback) {
            if (isReady) {
                callback();
                return;
            }

            var trigged = false;

            function trigger()
            {
                if (trigged) return;

                isReady = trigged = true;
                callback();
            }

            if (/complete|interactive/i.test(d.readyState)) {
                trigger();
            } else {
                d.addEventListener('DOMContentLoaded', trigger);
                d.addEventListener('load', trigger);
            }
        }
    };
})(document, window);

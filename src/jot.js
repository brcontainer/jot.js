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
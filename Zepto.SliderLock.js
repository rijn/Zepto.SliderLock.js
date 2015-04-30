/**
 * Zepto.SliderLock.js
 * @author  Rijn
 * @link [https://github.com/rijn/Zepto.SliderLock.js]
 */

;
(function($, window, document, undefined) {
    "use strict";

    var nullFunc = function() {},
        objectHolder = {};

    /* insert dom */
    function readyDom(iObj) {
        var holder = iObj.holder,
            option = iObj.option,
            color = option.matrix,
            secondaryColor = option.margin,
            radius = option.margin,
            containerHeight = option.containerHeight,
            containerWidth = option.containerWidth,
            barWidth = option.barWidth,
            html = "";

        console.log(option);

    }

    /* Slider class */
    function Slider() {}

    Slider.prototype = {
        constructor: Slider,
        getDistance: function(x) {
            var option = this.option,
                distance = x - this.wrapLeft;

            return {
                distance: distance
            };
        }
    };

    function SliderLock(selector, option) {
        var self = this,
            token = self.token = Math.random(),
            iObj = objectHolder[token] = new Slider(),
            holder = iObj.holder = $(selector);

        //if holder is not present return
        if (holder.length == 0) return;

        iObj.object = self;
        option = iObj.option = $.extend({}, SliderLock.defaults, option);

        readyDom(iObj);

        iObj.option.init = (option.init || nullFunc)();
    };

    SliderLock.prototype = {
        constructor: SliderLock,
        //method to set options after initializtion
        option: function(key, val) {
            var iObj = objectHolder[this.token],
                option = iObj.option;
            //for set methods
            if (!val) {
                return option[key];
            }
            //for setter
            else {
                option[key] = val;
                if (key == "margin" || key == "matrix" || key == "radius") {
                    readyDom(iObj);
                }
            }
        },
        enable: function() {

        },
        disable: function() {

        },
    };

    SliderLock.defaults = {
        color: '#64bd63',
        secondaryColor: '#dfdfdf',
        radius: '10px',
        containerHeight: '10px',
        containerWidth: '100px',
        barWidth: '20px'
    };

    window.SliderLock = SliderLock;

})(Zepto, window, document);

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
            color = option.color,
            secondaryColor = option.secondaryColor,
            radius = option.radius,
            containerHeight = option.containerHeight,
            containerWidth = option.containerWidth,
            barWidth = option.barWidth,
            barMargin = option.barMargin,
            html = '<div class="zepto-sliderlock"><div class="zepto-sliderlock-bar"></div></div>';

        holder.html(html).children('.zepto-sliderlock').css({
            'width': (containerWidth || 0) + 'px',
            'height': (containerHeight || 0) + 'px',
            'background': (color || "#ffffff"),
            'border-radius': (radius || 0) + 'px',
            'position': 'relative'
        }).children('.zepto-sliderlock-bar').css({
            'height': (containerHeight - barMargin * 2) + 'px',
            'width': (barWidth || 0) + 'px',
            'background': (secondaryColor || "#ffffff"),
            'border-radius': (radius || 0) + 'px',
            'margin': (barMargin || 0) + 'px',
            'position': 'absolute'
        });

        iObj.bar = iObj.holder.find('.zepto-sliderlock-bar').first();

        return;
    }


    var startHandler = function(e, obj) {
            e.preventDefault();
            var iObj = objectHolder[obj.token];

            if (iObj.disabled) return;

            var touchMove = e.type == "touchstart" ? "touchmove" : "mousemove",
                touchEnd = e.type == "touchstart" ? "touchend" : "mouseup";

            iObj.startPoint(e.pageX || e.touches[0].pageX);

            //assign events
            $(this).on(touchMove + '.bar-move', function(e) {
                moveHandler.call(this, e, obj);
            });
            $(document).one(touchEnd, function() {
                endHandler.call(this, e, obj);
            });
        },
        moveHandler = function(e, obj) {

            e.preventDefault();

            var x = e.pageX || e.touches[0].pageX,
                iObj = objectHolder[obj.token],
                option = iObj.option,
                maxDistance = option.containerWidth - option.barMargin - option.barWidth,
                posObj = iObj.refreshDistance(x),
                distance = posObj.distance;

            if (!iObj.disabled) {
                if (distance) {
                    distance = distance < option.barMargin ? option.barMargin : distance;
                    distance = distance < maxDistance ? distance : maxDistance;

                    if (!!option.magnet) {
                        if (maxDistance - distance < option.triggerDistance) {
                            distance = maxDistance;
                        };
                    };

                    iObj.bar.css({
                        'margin-left': distance + "px"
                    });


                    if (!!option.magnet) {
                        if (maxDistance - distance < option.triggerDistance) {
                            iObj.disabled = true;
                            iObj.option.arrival();
                            setTimeout(
                                function() {
                                    iObj.disabled = false;
                                },
                                0
                            );
                        };
                    };
                };
            };

        },
        endHandler = function(e, obj) {
            e.preventDefault();
            var x = e.pageX || e.touches[0].pageX,
                iObj = objectHolder[obj.token],
                option = iObj.option,
                maxDistance = option.containerWidth - option.barMargin - option.barWidth,
                posObj = iObj.getDistance(),
                distance = posObj.distance;

            iObj.holder.off('.bar-move');

            if (maxDistance - distance < option.triggerDistance) {
                iObj.option.succeed();
            };

            iObj.bar.css({
                "margin-left": option.barMargin + "px"
            });

            if (maxDistance - distance > option.triggerDistance) {
                iObj.option.failed();
            };
        };

    /* Slider class */
    function Slider() {}

    Slider.prototype = {
        constructor: Slider,
        startPoint: function(x) {
            this.start = x;
        },
        refreshDistance: function(x) {
            var option = this.option,
                distance = x - this.start;
            this.distance = distance;
            return {
                distance: distance
            };
        },
        getDistance: function() {
            return {
                distance: this.distance
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

        //change offset property of holder if it does not have any property
        if (holder.css('position') == "static") holder.css('position', 'relative');

        iObj.option.init = (option.init || nullFunc)();
        iObj.option.arrival = option.arrival || nullFunc;
        iObj.option.succeed = option.succeed || nullFunc;
        iObj.option.failed = option.failed || nullFunc;

        //assign event
        holder.on("touchstart mousedown", function(e) {
            startHandler.call(this, e, self);
        });
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
            var iObj = objectHolder[this.token];
            iObj.disabled = false;
        },
        disable: function() {
            var iObj = objectHolder[this.token];
            iObj.disabled = true;
        },
        lock: function() {
            var iObj = objectHolder[this.token];
            iObj.holder.off('.bar-move');
        },
        reset: function() {
            var iObj = objectHolder[this.token];
            iObj.holder.off('.bar-move');

            iObj.bar.css({
                "margin-left": iObj.option.barMargin + "px"
            });
        }
    };

    SliderLock.defaults = {
        color: '#dfdfdf',
        secondaryColor: '#64bd63',
        radius: 10,
        containerHeight: 40,
        containerWidth: 200,
        barWidth: 50,
        barMargin: 3,
        triggerDistance: 30,
        magnet: true
    };

    window.SliderLock = SliderLock;

})(Zepto, window, document);

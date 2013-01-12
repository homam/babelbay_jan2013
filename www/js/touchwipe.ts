/// <reference path="jquery-1.8.d.ts" />


(function (window) {
    var getBestEvent = function (events) {
        for (var i = 0; i < events.length; i++) {
            var ev = events[i];
            if ((('on' + ev) in document.documentElement)) {
                return ev;
            }
        }
        return null;
    };

    window.touchwipe = function (settings, element) {
        var config:any = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function () { },
            wipeRight: function () { },
            wipeUp: function () { },
            wipeDown: function () { },
            preventDefaultEvents: false
        };

        config = $.extend(config, settings);

        (function () {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                element.removeEventListener(getBestEvent(['touchmove', 'mousemove']), onTouchMove);
                startX = null;
                isMoving = false;
                return true;
            }

            function onTouchMove(e) {

                if (isMoving) {

                    var touch = e;
                    if (e.touches) {
                        touch = e.touches[0];
                    }
                    var x = touch.pageX;
                    var y = touch.pageY;

                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x
                        && Math.abs(dx)>Math.abs(dy)
                        ) {
                        e.preventDefault();
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft();
                        }
                        else {
                            config.wipeRight();
                        }
                    }
                    else if (Math.abs(dy) >= config.min_move_y &&
                       Math.abs(dy) > Math.abs(dx) 
                        ) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown();
                        }
                        else {
                            config.wipeUp();
                        }
                    }
                }
                return true;
            }

            function onTouchStart(e) {
                var touch = e;
                if (e.touches) {
                    touch = e.touches[0];
                }
                startX = touch.pageX;
                startY = touch.pageY;
                isMoving = true;

                element.addEventListener(getBestEvent(['touchmove', 'mousemove']), onTouchMove, false);
                return true;
            }

            element.addEventListener(getBestEvent(['touchstart', 'mousedown']), onTouchStart, false);

            element.addEventListener(getBestEvent(['touchend', 'mouseup']), cancelTouch, false);

        })();

        return this;
    };

})(window);

declare var touchwipe: (a, b) => { };
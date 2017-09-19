/// <reference path="../../../typings/js/aul.js.d.ts" />
if (!String.empty) {
    String.empty = '';
}
if (!String.undefined) {
    String.undefined = 'undefined';
}
if (!String.format) {
    String.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!str) {
            return;
        }
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };
}
if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = function (str) {
        return str == null || str == undefined || str.length == 0;
    };
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = function (str) {
        try {
            if (str == null || str == 'undefined')
                return true;
            return str.toString().replace(/\s/g, '').length < 1;
        }
        catch (e) {
            return false;
        }
    };
}
var StringBuilder = /** @class */ (function () {
    function StringBuilder(value) {
        if (value === void 0) { value = String.empty; }
        this.values = [];
        this.values = new Array(value);
    }
    StringBuilder.prototype.toString = function () {
        return this.values.join(String.empty);
    };
    StringBuilder.prototype.append = function (value) {
        this.values.push(value);
    };
    StringBuilder.prototype.appendBr = function (value) {
        this.append(value);
        this.append('<br/>');
    };
    StringBuilder.prototype.appendFormat = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.values.push(String.format.apply(String, [value].concat(args)));
    };
    StringBuilder.prototype.clear = function () {
        this.values = [];
    };
    return StringBuilder;
}());
//# sourceMappingURL=aul.js.string.js.map
if (!Array.any) {
    Array.any = function (array) {
        return array != null && array != undefined && array.length != 0;
    };
}
if (!Array.contains) {
    Array.contains = function (array, key) {
        if (!Array.any(array)) {
            return false;
        }
        return array.indexOf(key) != -1;
    };
}
//# sourceMappingURL=aul.js.array.js.map
// カスタマイズ
(function ($) {
    $.fn.extend({
        ///// animate.css実施
        animateCss: function (animationName, options) {
            var d = $.Deferred();
            //初期化
            options = $.extend({
                callback: null,
                hiddenClassName: 'animatehide'
            }, options);
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.css('visibility', 'visible');
            this.removeClass(options.hiddenClassName);
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                // 非表示かどうか
                var isHidden = (animationName.indexOf('Out') != -1);
                if (isHidden) {
                    $(this).addClass(options.hiddenClassName);
                }
                $(this).removeClass('animated ' + animationName);
                d.resolve();
            });
            return d.promise();
        },
        ///// animate.cssを順に実施
        animateStairs: function (animateName, options) {
            var d = $.Deferred();
            var $this = this;
            //初期化
            options = $.extend({
                callback: null,
                delayTime: 100,
                hiddenClassName: 'animatehide'
            }, options);
            var _animateStairs = function ($this, isLast, animateName, options) {
                var defer = $.Deferred();
                setTimeout(function () {
                    if (isLast) {
                        $.Deferred().resolve().then(function () {
                            return $this.animateCss(animateName, options);
                        }).done(function () {
                            defer.resolve();
                        });
                    }
                    else {
                        $this.animateCss(animateName, options);
                        defer.resolve();
                    }
                }, options.delayTime);
                return defer.promise();
            };
            var maps = $.map($this, function (val, i) { return $(val); });
            var deferreds = maps.map(function (val, i) {
                return function () {
                    return _animateStairs(val, i == (maps.length - 1), animateName, options);
                };
            });
            deferreds.reduce(function (prev, curr) {
                return prev.then(function () {
                    return curr();
                });
            }, $.Deferred().resolve());
            // 全ての deferredFunc が resolve したら
            $.when.apply($, deferreds).done(function () {
                d.resolve();
            });
            return d.promise();
        }
    });
}(jQuery));
//# sourceMappingURL=aul.jquery.animation.js.map
// カスタマイズ
(function ($) {
    $.fn.extend({
        ///// animate.css実施
        animateCss: function (animationName: string, options?: AnimateCssOption): JQueryPromise<{}> {
            var d = $.Deferred();
            //初期化
            options = $.extend({
                callback: null
                , hiddenClassName: 'animatehide'
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
        animateStairs(animateName: string, options?: AnimateStairsOption): JQueryPromise<{}> {
            var d = $.Deferred();
            var $this: JQuery = this;
            //初期化
            options = $.extend({
                callback: null
                , delayTime: 100
                , hiddenClassName: 'animatehide'
            }, options);

            var _animateStairs = function ($this: JQuery, isLast: boolean, animateName: string, options?: AnimateStairsOption): JQueryPromise<{}> {
                var defer = $.Deferred();
                setTimeout(function () {
                    if (isLast) {
                        $.Deferred().resolve().then(function () {
                            return $this.animateCss(animateName, options);
                        }).done(function () {
                            defer.resolve();
                        });
                    } else {
                        $this.animateCss(animateName, options);
                        defer.resolve();
                    }
                }, options.delayTime);

                return defer.promise();
            }

            var maps = $.map($this, function (val, i) { return $(val); });
            var deferreds = maps.map(function (val, i) { // ここではまだ実行したくないので，無名関数でくるむ
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
            })

            return d.promise();
        }

    })
}(jQuery));


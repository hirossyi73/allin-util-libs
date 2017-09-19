interface JQuery {
    animateCss(animationName: string, options?: AnimateCssOption): JQueryPromise<{}>;
    animateStairs(animateName: string, options?: AnimateCssOption): JQueryPromise<{}>;
}
interface AnimateCssOption {
    hiddenClassName?: string;
}

interface AnimateStairsOption {
    delayTime?: number;
    hiddenClassName?: string;
}

if (!Array.any) {
    Array.any = function (array: Array<any>): boolean {
        return array != null && array != undefined && array.length != 0;
    }
}
if (!Array.contains) {
    Array.contains = function (array: Array<any>, key: any): boolean {
        if (!Array.any(array)) {
            return false;
        }
        return array.indexOf(key) != -1;
    }
}
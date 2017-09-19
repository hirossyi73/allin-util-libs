/// <reference path="../../../typings/js/aul.js.d.ts" />


if (!String.empty) {
    String.empty = '';
}
if (!String.undefined) {
    String.undefined = 'undefined';
}

if (!String.format) {
    String.format = function (str: string, ...args: any[]): string {
        if (!str) {
            return;
        }
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = function (str: string): boolean {
        return str == null || str == undefined || str.length == 0;
    };
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = function (str: string): boolean {
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

class StringBuilder {
    private values: string[] = [];

    constructor(value: string = String.empty) {
        this.values = new Array(value);
    }
    public toString() {
        return this.values.join(String.empty);
    }
    public append(value: string) {
        this.values.push(value);
    }
    public appendBr(value: string) {
        this.append(value);
        this.append('<br/>');
    }
    public appendFormat(value: string, ...args: string[]) {
        this.values.push(String.format(value, ...args));
    }
    public clear() {
        this.values = [];
    }
}


interface StringConstructor {
    format(str: string, ...replacements: string[]): string;
    isNullOrEmpty(str: string): boolean;
    isNullOrWhiteSpace(str: string): boolean;

    empty: string;
    undefined: string;
}

interface ArrayConstructor {
    any(array: Array<any>): boolean;
    contains<T1, T2>(array: Array<T1>, key: T2): boolean;
}


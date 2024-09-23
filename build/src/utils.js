"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.pad = exports.parseContainers = exports.interpretField = void 0;
function interpretField(data, fields) {
    let remainder = data;
    const res = {};
    fields.forEach((field) => {
        const { name, interpreterFn, length } = field;
        const interpreterFnDefault = (x) => x;
        const interpretFunction = interpreterFn || interpreterFnDefault;
        if (length) {
            res[name] = interpretFunction(remainder.subarray(0, length));
            remainder = remainder.subarray(length);
        }
        else {
            res[name] = interpretFunction(remainder);
        }
    });
    return res;
}
exports.interpretField = interpretField;
function parseContainers(data, f) {
    let remainder = data;
    const containers = [];
    while (remainder.length > 0) {
        const result = f(remainder);
        containers.push(result[0]);
        remainder = result[1];
    }
    return containers;
}
exports.parseContainers = parseContainers;
function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
exports.pad = pad;
function handleError(error) {
    console.log(error);
}
exports.handleError = handleError;

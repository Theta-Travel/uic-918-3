"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZXing = void 0;
const tslib_1 = require("tslib");
const zxing_wasm_1 = require("zxing-wasm");
const defaultOptions = {
    tryHarder: true,
    formats: ['Aztec']
};
function ZXing(data_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function* (data, options = defaultOptions) {
        const [barcodeResult] = yield (0, zxing_wasm_1.readBarcodesFromImageFile)(new Blob([data]), options);
        if (!barcodeResult || !barcodeResult.isValid || !barcodeResult.bytes) {
            throw new Error('Could not detect a valid Aztec barcode');
        }
        return Buffer.from(barcodeResult.bytes);
    });
}
exports.ZXing = ZXing;

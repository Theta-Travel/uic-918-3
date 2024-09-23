'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.interpretBarcode = exports.readBarcode = void 0;
const tslib_1 = require('tslib');
const barcode_reader_1 = require('./barcode-reader');
const barcode_data_1 = tslib_1.__importDefault(require('./barcode-data'));
const readBarcode = function (input, options) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const defaults = {
      verifySignature: false
    };
    const opts = Object.assign({}, defaults, options);
    const barcodeData = yield (0, barcode_reader_1.ZXing)(input);
    const ticket = yield (0, barcode_data_1.default)(barcodeData, opts.verifySignature);
    return ticket;
  });
};
exports.readBarcode = readBarcode;
var barcode_data_2 = require('./barcode-data');
Object.defineProperty(exports, 'interpretBarcode', {
  enumerable: true,
  get: function () {
    return tslib_1.__importDefault(barcode_data_2).default;
  }
});

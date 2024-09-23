'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const block_types_1 = require('../block-types');
const TC_U_TLAY_01 = {
  name: 'U_TLAY',
  version: '01',
  dataFields: [
    {
      name: 'layout',
      length: 4,
      interpreterFn: block_types_1.STRING
    },
    {
      name: 'amount_rct2_blocks',
      length: 4,
      interpreterFn: block_types_1.STR_INT
    },
    {
      name: 'rct2_blocks',
      length: null,
      interpreterFn: block_types_1.RCT2_BLOCKS
    }
  ]
};
exports.default = TC_U_TLAY_01;

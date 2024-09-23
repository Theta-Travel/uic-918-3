'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const block_types_1 = require('../block-types');
const TC_0080ID_01 = {
  name: '0080ID',
  version: '01',
  dataFields: [
    {
      name: 'ausweis_typ',
      length: 2,
      interpreterFn: block_types_1.AUSWEIS_TYP
    },
    {
      name: 'ziffer_ausweis',
      length: 4,
      interpreterFn: block_types_1.STRING
    }
  ]
};
exports.default = TC_0080ID_01;

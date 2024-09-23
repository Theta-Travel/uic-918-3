"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_types_1 = require("../block-types");
const TC_0080VU_01 = {
    name: '0080VU',
    version: '01',
    dataFields: [
        {
            name: 'Terminalnummer',
            length: 2,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'SAM_ID',
            length: 3,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'persons',
            length: 1,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'anzahlEFS',
            length: 1,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'VDV_EFS_BLOCK',
            length: null,
            interpreterFn: block_types_1.EFS_DATA
        }
    ]
};
exports.default = TC_0080VU_01;

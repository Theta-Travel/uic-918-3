"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_types_1 = require("../block-types");
const TC_0080BL_03 = {
    name: '0080BL',
    version: '03',
    dataFields: [
        {
            name: 'TBD0',
            length: 2,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'blocks',
            length: null,
            interpreterFn: block_types_1.auftraegeSBlocksV3
        }
    ]
};
exports.default = TC_0080BL_03;

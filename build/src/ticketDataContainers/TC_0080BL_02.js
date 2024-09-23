"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_types_1 = require("../block-types");
const TC_0080BL_02 = {
    name: '0080BL',
    version: '02',
    dataFields: [
        {
            name: 'TBD0',
            length: 2,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'blocks',
            length: undefined,
            interpreterFn: block_types_1.auftraegeSBlocksV2
        }
    ]
};
exports.default = TC_0080BL_02;

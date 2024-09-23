"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_types_1 = require("../block-types");
const TC_1180AI_01 = {
    name: '1180AI',
    version: '01',
    dataFields: [
        {
            name: 'customer?',
            length: 7,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'vorgangs_num',
            length: 8,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown1',
            length: 5,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown2',
            length: 2,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'full_name',
            length: 20,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'adults#',
            length: 2,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'children#',
            length: 2,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'unknown3',
            length: 2,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'description',
            length: 20,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'ausweis?',
            length: 10,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown4',
            length: 7,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'valid_from',
            length: 8,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'valid_to?',
            length: 8,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown5',
            length: 5,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'start_bf',
            length: 20,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown6',
            length: 5,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'ziel_bf?',
            length: 20,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'travel_class',
            length: 1,
            interpreterFn: block_types_1.INT
        },
        {
            name: 'unknown7',
            length: 6,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'unknown8',
            length: 1,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'issue_date',
            length: 8,
            interpreterFn: block_types_1.STRING
        }
    ]
};
exports.default = TC_1180AI_01;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_types_1 = require("../block-types");
const TC_U_HEAD_01 = {
    name: 'U_HEAD',
    version: '01',
    dataFields: [
        {
            name: 'carrier',
            length: 4,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'auftragsnummer',
            length: 8,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'padding',
            length: 12,
            interpreterFn: block_types_1.HEX
        },
        {
            name: 'creation_date',
            length: 12,
            interpreterFn: block_types_1.DB_DATETIME
        },
        {
            name: 'flags',
            length: 1,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'language',
            length: 2,
            interpreterFn: block_types_1.STRING
        },
        {
            name: 'language_2',
            length: 2,
            interpreterFn: block_types_1.STRING
        }
    ]
};
exports.default = TC_U_HEAD_01;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auftraegeSBlocksV3 = exports.auftraegeSBlocksV2 = exports.RCT2_BLOCKS = exports.EFS_DATA = exports.AUSWEIS_TYP = exports.DB_DATETIME = exports.INT = exports.STR_INT = exports.HEX = exports.STRING = void 0;
const enums_1 = require("./enums");
const utils_1 = require("./utils");
const STRING = (x) => x.toString();
exports.STRING = STRING;
const HEX = (x) => x.toString('hex');
exports.HEX = HEX;
const STR_INT = (x) => parseInt(x.toString(), 10);
exports.STR_INT = STR_INT;
const INT = (x) => x.readUIntBE(0, x.length);
exports.INT = INT;
const DB_DATETIME = (x) => {
    const day = (0, exports.STR_INT)(x.subarray(0, 2));
    const month = (0, exports.STR_INT)(x.subarray(2, 4)) - 1;
    const year = (0, exports.STR_INT)(x.subarray(4, 8));
    const hour = (0, exports.STR_INT)(x.subarray(8, 10));
    const minute = (0, exports.STR_INT)(x.subarray(10, 12));
    return new Date(year, month, day, hour, minute);
};
exports.DB_DATETIME = DB_DATETIME;
const KA_DATETIME = (x) => {
    const dateStr = (0, utils_1.pad)(parseInt(x.toString('hex'), 16).toString(2), 32);
    const year = parseInt(dateStr.slice(0, 7), 2) + 1990;
    const month = parseInt(dateStr.slice(7, 11), 2) - 1;
    const day = parseInt(dateStr.slice(11, 16), 2);
    const hour = parseInt(dateStr.slice(16, 21), 2);
    const minute = parseInt(dateStr.slice(21, 27), 2);
    const sec = parseInt(dateStr.slice(27, 32), 2) / 2;
    return new Date(year, month, day, hour, minute, sec);
};
const ORG_ID = (x) => {
    const id = (0, exports.INT)(x);
    return (0, enums_1.orgid)(id);
};
const EFM_PRODUKT = (x) => {
    const orgId = (0, exports.INT)(x.subarray(2, 4));
    const produktNr = (0, exports.INT)(x.subarray(0, 2));
    return (0, enums_1.efm_produkt)(orgId, produktNr);
};
const AUSWEIS_TYP = (x) => {
    const number = (0, exports.STR_INT)(x);
    return enums_1.id_types[number];
};
exports.AUSWEIS_TYP = AUSWEIS_TYP;
const DC_LISTE = (x) => {
    const tagName = (0, exports.HEX)(x.subarray(0, 1));
    const dc_length = (0, exports.INT)(x.subarray(1, 2));
    const typ_DC = (0, exports.HEX)(x.subarray(2, 3));
    const pv_org_id = (0, exports.INT)(x.subarray(3, 5));
    const TP_RAW = splitDCList(dc_length, typ_DC, x.subarray(5, x.length));
    const TP = TP_RAW.map((item) => (0, enums_1.tarifpunkt)(pv_org_id, item));
    return { tagName, dc_length, typ_DC, pv_org_id, TP };
};
const EFS_FIELDS = [
    {
        name: 'berechtigungs_nr',
        length: 4,
        interpreterFn: exports.INT
    },
    {
        name: 'kvp_organisations_id',
        length: 2,
        interpreterFn: ORG_ID
    },
    {
        name: 'efm_produkt',
        length: 4,
        interpreterFn: EFM_PRODUKT
    },
    {
        name: 'valid_from',
        length: 4,
        interpreterFn: KA_DATETIME
    },
    {
        name: 'valid_to',
        length: 4,
        interpreterFn: KA_DATETIME
    },
    {
        name: 'preis',
        length: 3,
        interpreterFn: exports.INT
    },
    {
        name: 'sam_seqno',
        length: 4,
        interpreterFn: exports.INT
    },
    {
        name: 'lengthList_DC',
        length: 1,
        interpreterFn: exports.INT
    },
    {
        name: 'Liste_DC',
        length: undefined,
        interpreterFn: DC_LISTE
    }
];
const EFS_DATA = (x) => {
    const lengthListDC = (0, exports.INT)(x.subarray(25, 26));
    const t = [x.subarray(0, lengthListDC + 26)];
    if (lengthListDC + 26 < x.length) {
        t.push(x.subarray(lengthListDC + 26, x.length));
    }
    const res = {};
    t.forEach((ticket, index) => {
        res[1 + index] = (0, utils_1.interpretField)(ticket, EFS_FIELDS);
    });
    return res;
};
exports.EFS_DATA = EFS_DATA;
function splitDCList(dcLength, typDC, data) {
    let SEP;
    if (parseInt(typDC, 16) === 0x10) {
        SEP = 2;
    }
    else {
        SEP = 3;
    }
    const amount = (dcLength - 3) / SEP;
    const res = [];
    for (let i = 0; i < amount; i++) {
        res.push((0, exports.INT)(data.subarray(i * SEP, i * SEP + SEP)));
    }
    return res;
}
const interpretRCT2Block = (data) => {
    const line = parseInt(data.subarray(0, 2).toString(), 10);
    const column = parseInt(data.subarray(2, 4).toString(), 10);
    const height = parseInt(data.subarray(4, 6).toString(), 10);
    const width = parseInt(data.subarray(6, 8).toString(), 10);
    const style = parseInt(data.subarray(8, 9).toString(), 10);
    const length = parseInt(data.subarray(9, 13).toString(), 10);
    const value = data.subarray(13, 13 + length).toString();
    const res = {
        line,
        column,
        height,
        width,
        style,
        value
    };
    const rem = data.subarray(13 + length);
    return [res, rem];
};
const RCT2_BLOCKS = (x) => {
    return (0, utils_1.parseContainers)(x, interpretRCT2Block);
};
exports.RCT2_BLOCKS = RCT2_BLOCKS;
const A_BLOCK_FIELDS_V2 = [
    {
        name: 'certificate',
        length: 11,
        interpreterFn: exports.STRING
    },
    {
        name: 'padding',
        length: 11,
        interpreterFn: exports.HEX
    },
    {
        name: 'valid_from',
        length: 8,
        interpreterFn: exports.STRING
    },
    {
        name: 'valid_to',
        length: 8,
        interpreterFn: exports.STRING
    },
    {
        name: 'serial',
        length: 8,
        interpreterFn: exports.STRING
    }
];
const A_BLOCK_FIELDS_V3 = [
    {
        name: 'valid_from',
        length: 8,
        interpreterFn: exports.STRING
    },
    {
        name: 'valid_to',
        length: 8,
        interpreterFn: exports.STRING
    },
    {
        name: 'serial',
        length: 10,
        interpreterFn: exports.STRING
    }
];
const interpretSingleSBlock = (data) => {
    const res = {};
    const type = enums_1.sBlockTypes[parseInt(data.subarray(1, 4).toString(), 10)];
    const length = parseInt(data.subarray(4, 8).toString(), 10);
    res[type] = data.subarray(8, 8 + length).toString();
    const rem = data.subarray(8 + length);
    return [res, rem];
};
const auftraegeSBlocksV2 = (x) => {
    const A_LENGTH = 11 + 11 + 8 + 8 + 8;
    return auftraegeSblocks(x, A_LENGTH, A_BLOCK_FIELDS_V2);
};
exports.auftraegeSBlocksV2 = auftraegeSBlocksV2;
const auftraegeSBlocksV3 = (x) => {
    const A_LENGTH = 10 + 8 + 8;
    return auftraegeSblocks(x, A_LENGTH, A_BLOCK_FIELDS_V3);
};
exports.auftraegeSBlocksV3 = auftraegeSBlocksV3;
function auftraegeSblocks(x, A_LENGTH, fields) {
    const res = {};
    res.auftrag_count = parseInt(x.subarray(0, 1).toString(), 10);
    for (let i = 0; i < res.auftrag_count; i++) {
        const bez = `auftrag_${i + 1}`;
        res[bez] = (0, utils_1.interpretField)(x.subarray(1 + i * A_LENGTH, (i + 1) * A_LENGTH + 1), fields);
    }
    res.sblock_amount = parseInt(x.subarray(A_LENGTH * res.auftrag_count + 1, A_LENGTH * res.auftrag_count + 3).toString(), 10);
    const sblock_containers = (0, utils_1.parseContainers)(x.subarray(A_LENGTH * res.auftrag_count + 3), interpretSingleSBlock);
    res.sblocks = Object.assign({}, ...sblock_containers);
    return res;
}

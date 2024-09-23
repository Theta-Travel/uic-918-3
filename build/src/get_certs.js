"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertByID = exports.BarcodeXSD = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path_1 = require("path");
const { readFile } = fs_1.promises;
const lodash_1 = require("lodash");
const cert_url_json_1 = require("../cert_url.json");
const basePath = (0, path_1.dirname)(require.resolve('../cert_url.json'));
const filePath = (0, path_1.join)(basePath, cert_url_json_1.fileName);
var BarcodeXSD;
(function (BarcodeXSD) {
    BarcodeXSD["Empty"] = "";
    BarcodeXSD["String"] = "String";
})(BarcodeXSD || (exports.BarcodeXSD = BarcodeXSD = {}));
const openLocalFiles = (filePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield readFile(filePath, 'utf8');
        const uicKey = JSON.parse(file);
        return uicKey;
    }
    catch (error) {
        throw new Error(`Couldn't read file ${filePath}. ` + error);
    }
});
const selectCert = (keys, ricsCode, keyId) => {
    const searchPattern = {
        issuerCode: [ricsCode.toString()],
        id: [keyId.toString()]
    };
    const cert = (0, lodash_1.find)(keys.keys.key, searchPattern);
    if (!cert) {
        console.log(`Couldn't find a certificate for issuer ${ricsCode} and key number ${keyId}`);
    }
    return cert;
};
const getCertByID = (orgId_1, keyId_1, ...args_1) => tslib_1.__awaiter(void 0, [orgId_1, keyId_1, ...args_1], void 0, function* (orgId, keyId, path = filePath) {
    try {
        const keys = yield openLocalFiles(path);
        return selectCert(keys, orgId, keyId);
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
});
exports.getCertByID = getCertByID;

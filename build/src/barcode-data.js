"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketDataContainer = void 0;
const tslib_1 = require("tslib");
const zlib_1 = require("zlib");
const TicketContainer_1 = tslib_1.__importDefault(require("./TicketContainer"));
const utils_1 = require("./utils");
const check_signature_1 = require("./check_signature");
function getVersion(data) {
    return parseInt(data.subarray(3, 5).toString(), 10);
}
function getLengthOfSignatureByVersion(version) {
    if (version !== 1 && version !== 2) {
        throw new Error(`Barcode header contains a version of ${version} (instead of 1 or 2), which is not supported by this library yet.`);
    }
    const lengthOfSignature = version === 1 ? 50 : 64;
    return lengthOfSignature;
}
function getHeader(data) {
    const umid = data.subarray(0, 3);
    const mt_version = data.subarray(3, 5);
    const rics = data.subarray(5, 9);
    const key_id = data.subarray(9, 14);
    return { umid, mt_version, rics, key_id };
}
function getSignature(data, version) {
    return data.subarray(14, 14 + getLengthOfSignatureByVersion(version));
}
function getTicketDataLength(data, version) {
    return data.subarray(getLengthOfSignatureByVersion(version) + 14, getLengthOfSignatureByVersion(version) + 18);
}
function getTicketDataRaw(data, version) {
    return data.subarray(getLengthOfSignatureByVersion(version) + 18, data.length);
}
function getTicketDataUncompressed(data) {
    if (data && data.length > 0) {
        return (0, zlib_1.unzipSync)(data);
    }
    else {
        return data;
    }
}
class TicketDataContainer {
    constructor(data) {
        this.id = data.subarray(0, 6).toString();
        this.version = data.subarray(6, 8).toString();
        this.length = parseInt(data.subarray(8, 12).toString(), 10);
        this.container_data = TicketDataContainer.parseFields(this.id, this.version, data.subarray(12, data.length));
    }
    static parseFields(id, version, data) {
        const fields = getBlockTypeFieldsByIdAndVersion(id, version);
        if (fields) {
            return (0, utils_1.interpretField)(data, fields.dataFields);
        }
        else {
            console.log(`ALERT: Container with id ${id} and version ${version} isn't implemented for TicketContainer ${id}.`);
            return data;
        }
    }
}
exports.TicketDataContainer = TicketDataContainer;
const interpretTicketContainer = (data) => {
    const length = parseInt(data.subarray(8, 12).toString(), 10);
    const remainder = data.subarray(length, data.length);
    const container = new TicketDataContainer(data.subarray(0, length));
    return [container, remainder];
};
function getBlockTypeFieldsByIdAndVersion(id, version) {
    return TicketContainer_1.default.find((ticketContainer) => ticketContainer.name === id && ticketContainer.version === version);
}
function parseBarcodeData(data_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function* (data, verifySignature = false) {
        const version = getVersion(data);
        const ticketDataRaw = getTicketDataRaw(data, version);
        const ticketDataUncompressed = getTicketDataUncompressed(ticketDataRaw);
        const ticketContainers = (0, utils_1.parseContainers)(ticketDataUncompressed, interpretTicketContainer);
        const ticket = {
            version,
            header: getHeader(data),
            signature: getSignature(data, version),
            ticketDataLength: getTicketDataLength(data, version),
            ticketDataRaw,
            ticketDataUncompressed,
            ticketContainers
        };
        if (verifySignature) {
            const validityOfSignature = yield (0, check_signature_1.verifyTicket)(ticket);
            ticket.validityOfSignature = validityOfSignature;
            if (validityOfSignature === check_signature_1.TicketSignatureVerficationStatus.VALID) {
                ticket.isSignatureValid = true;
            }
            else if (validityOfSignature === check_signature_1.TicketSignatureVerficationStatus.INVALID) {
                ticket.isSignatureValid = false;
            }
        }
        return ticket;
    });
}
exports.default = parseBarcodeData;

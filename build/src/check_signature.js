'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyTicket = exports.TicketSignatureVerficationStatus = void 0;
const tslib_1 = require('tslib');
const rs = tslib_1.__importStar(require('jsrsasign'));
const get_certs_1 = require('./get_certs');
function checkSignature(certPEM, signature, message) {
  const sig = new rs.KJUR.crypto.Signature({ alg: 'SHA1withDSA' });
  sig.init(certPEM);
  sig.updateHex(message);
  return sig.verify(signature);
}
function getCertByHeader(header) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const orgId = parseInt(header.rics.toString(), 10);
    const keyId = parseInt(header.key_id.toString(), 10);
    const cert = yield (0, get_certs_1.getCertByID)(orgId, keyId);
    return cert;
  });
}
var TicketSignatureVerficationStatus;
(function (TicketSignatureVerficationStatus) {
  TicketSignatureVerficationStatus['VALID'] = 'VALID';
  TicketSignatureVerficationStatus['INVALID'] = 'INVALID';
  TicketSignatureVerficationStatus['NOPUBLICKEY'] = 'Public Key not found';
})(
  TicketSignatureVerficationStatus || (exports.TicketSignatureVerficationStatus = TicketSignatureVerficationStatus = {})
);
const verifyTicket = function (ticket) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const cert = yield getCertByHeader(ticket.header);
    if (!cert) {
      console.log("No certificate found. Signature couldn't been proofed.");
      return TicketSignatureVerficationStatus.NOPUBLICKEY;
    }
    const modifiedCert = '-----BEGIN CERTIFICATE-----\n' + cert.publicKey + '\n-----END CERTIFICATE-----\n';
    const publicKey = rs.KEYUTIL.getKey(modifiedCert);
    const isSignatureValid = checkSignature(
      publicKey,
      ticket.signature.toString('hex'),
      ticket.ticketDataRaw.toString('hex')
    );
    return isSignatureValid ? TicketSignatureVerficationStatus.VALID : TicketSignatureVerficationStatus.INVALID;
  });
};
exports.verifyTicket = verifyTicket;

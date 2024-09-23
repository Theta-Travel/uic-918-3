import { ParsedUIC918Barcode } from './barcode-data';
export declare enum TicketSignatureVerficationStatus {
    VALID = "VALID",
    INVALID = "INVALID",
    NOPUBLICKEY = "Public Key not found"
}
export declare const verifyTicket: (ticket: ParsedUIC918Barcode) => Promise<TicketSignatureVerficationStatus>;

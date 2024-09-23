/// <reference types="node" />
import { interpretFieldResult } from './utils';
import { SupportedTypes } from './FieldsType';
import { TicketSignatureVerficationStatus } from './check_signature';
export type BarcodeHeader = {
    umid: Buffer;
    mt_version: Buffer;
    rics: Buffer;
    key_id: Buffer;
};
export declare class TicketDataContainer {
    id: string;
    version: string;
    length: number;
    container_data: Buffer | interpretFieldResult;
    constructor(data: Buffer);
    static parseFields(id: string, version: string, data: Buffer): Buffer | interpretFieldResult;
}
export type ParsedUIC918Barcode = {
    version: number;
    header: BarcodeHeader;
    signature: Buffer;
    ticketDataLength: Buffer;
    ticketDataRaw: Buffer;
    ticketDataUncompressed: Buffer;
    ticketContainers: SupportedTypes[];
    validityOfSignature?: TicketSignatureVerficationStatus;
    isSignatureValid?: boolean;
};
declare function parseBarcodeData(data: Buffer, verifySignature?: boolean): Promise<ParsedUIC918Barcode>;
export default parseBarcodeData;

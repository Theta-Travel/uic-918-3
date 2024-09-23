export interface UICKeys {
    keys: Keys;
}
export interface Keys {
    key: Key[];
}
export interface Key {
    issuerName: string[];
    issuerCode: string[];
    versionType: string[];
    signatureAlgorithm: string[];
    id: string[];
    publicKey: string[];
    barcodeVersion: string[];
    startDate: Date[];
    endDate: Date[];
    barcodeXsd: BarcodeXSD[];
    allowedProductOwnerCodes: Array<AllowedProductOwnerCodeClass | string>;
    keyForged: string[];
    commentForEncryptionType: string[];
}
export interface AllowedProductOwnerCodeClass {
    productOwnerCode: string[];
    productOwnerName: string[];
}
export declare enum BarcodeXSD {
    Empty = "",
    String = "String"
}
export declare const getCertByID: (orgId: number, keyId: number, path?: string) => Promise<Key | undefined>;

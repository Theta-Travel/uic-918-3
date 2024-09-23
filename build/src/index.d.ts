/// <reference types="node" />
import { ParsedUIC918Barcode } from './barcode-data';
type ReadBarcodeOptions = {
  verifySignature?: boolean;
};
export declare const readBarcode: (
  input: string | Buffer,
  options?: ReadBarcodeOptions
) => Promise<ParsedUIC918Barcode>;
export { default as interpretBarcode } from './barcode-data';

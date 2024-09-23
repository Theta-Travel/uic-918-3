import { ZXing } from './barcode-reader';
import interpretBarcode, { ParsedUIC918Barcode } from './barcode-data';

type ReadBarcodeOptions = {
  verifySignature?: boolean;
};

export const readBarcode = async function (
  input: string | Buffer,
  options?: ReadBarcodeOptions
): Promise<ParsedUIC918Barcode> {
  const defaults = {
    verifySignature: false
  };
  const opts: ReadBarcodeOptions = Object.assign({}, defaults, options);

  const barcodeData = await ZXing(input);
  const ticket = await interpretBarcode(barcodeData, opts.verifySignature);
  return ticket;
};

export { default as interpretBarcode } from './barcode-data';

/// <reference types="node" />
import { ReaderOptions } from 'zxing-wasm';
export declare function ZXing(data: string | Buffer, options?: ReaderOptions): Promise<Buffer>;

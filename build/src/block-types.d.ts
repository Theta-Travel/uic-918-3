/// <reference types="node" />
import { InterpreterFunctionType } from './FieldsType';
import { interpretFieldResult as InterpretFieldResult } from './utils';
export declare const STRING: InterpreterFunctionType<string>;
export declare const HEX: InterpreterFunctionType<string>;
export declare const STR_INT: InterpreterFunctionType<number>;
export declare const INT: InterpreterFunctionType<number>;
export declare const DB_DATETIME: InterpreterFunctionType<Date>;
export declare const AUSWEIS_TYP: (x: Buffer) => string;
export interface DC_LISTE_TYPE {
    tagName: string;
    dc_length: number;
    typ_DC: string;
    pv_org_id: number;
    TP: string[];
}
export type IEFS_DATA = Record<number, InterpretFieldResult>;
export declare const EFS_DATA: (x: Buffer) => IEFS_DATA;
export type RCT2_BLOCK = {
    line: number;
    column: number;
    height: number;
    width: number;
    style: number;
    value: string;
};
export declare const RCT2_BLOCKS: (x: Buffer) => RCT2_BLOCK[];
export declare const auftraegeSBlocksV2: (x: Buffer) => InterpretFieldResult;
export declare const auftraegeSBlocksV3: (x: Buffer) => InterpretFieldResult;

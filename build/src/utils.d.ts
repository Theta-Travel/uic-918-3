/// <reference types="node" />
import { FieldsType, SupportedTypes } from './FieldsType';
export type interpretFieldResult = {
    [index: string]: SupportedTypes;
};
export declare function interpretField(data: Buffer, fields: FieldsType[]): interpretFieldResult;
export type parsingFunction = (data: Buffer) => [SupportedTypes, Buffer?];
export declare function parseContainers(data: Buffer, f: parsingFunction): SupportedTypes[];
export declare function pad(number: number | string, length: number): string;
export declare function handleError(error: Error): void;

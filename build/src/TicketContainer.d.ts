import { FieldsType } from './FieldsType';
type TicketContainerTypeVersions = '01' | '02' | '03';
export interface TicketContainerType {
    name: string;
    version: TicketContainerTypeVersions;
    dataFields: FieldsType[];
}
export declare const TicketContainer: TicketContainerType[];
export default TicketContainer;

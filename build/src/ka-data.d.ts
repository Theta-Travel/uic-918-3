export type OrgID = number;
export type Produktnummer = number;
export type TarifpunktNr = number;
export interface VDVKAData {
    org_id: Record<OrgID, string>;
    efmprodukte: Record<OrgID, Record<Produktnummer, string>>;
    tarifpunkte: Record<OrgID, Record<TarifpunktNr, string>>;
}
declare const kaData: VDVKAData;
export default kaData;

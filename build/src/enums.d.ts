export declare const orgid: (orgId: number) => string;
export declare const tarifpunkt: (orgId: number, tp: number) => string;
export type EFM_Produkt = {
    kvp_organisations_id: string;
    produkt_nr: string;
};
export declare const efm_produkt: (orgId: number, produktId: number) => EFM_Produkt;
export declare enum sBlockTypes {
    'Preismodell' = 1,
    'Produktklasse Gesamtticket' = 2,
    'Produktklasse Hinfahrt' = 3,
    'Produktklasse Rückfahrt' = 4,
    'Passagiere' = 9,
    'Kinder' = 12,
    'Klasse' = 14,
    'H-Start-Bf' = 15,
    'H-Ziel-Bf' = 16,
    'R-Start-Bf' = 17,
    'R-Ziel-Bf' = 18,
    'Vorgangsnr./Flugscheinnr.' = 19,
    'Vertragspartner' = 20,
    'VIA' = 21,
    'Personenname' = 23,
    'Preisart' = 26,
    'Ausweis-ID' = 27,
    'Vorname, Name' = 28,
    'Gueltig von' = 31,
    'Gueltig bis' = 32,
    'Start-Bf-ID' = 35,
    'Ziel-Bf-ID' = 36,
    'Anzahl Personen' = 40,
    'TBD EFS Anzahl' = 41
}
export declare enum id_types {
    'CC' = 1,
    'BC' = 4,
    'EC' = 7,
    'Bonus.card business' = 8,
    'Personalausweis' = 9,
    'Reisepass' = 10,
    'bahn.bonus Card' = 11
}

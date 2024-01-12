import KA_DATA from "./ka-data"

export const orgid = (orgId:number) => {
  return KA_DATA.org_id[orgId] || orgId.toString()
}

export const tarifpunkt = (orgId:number, tp:number) => {
  if (KA_DATA.tarifpunkte[orgId] && KA_DATA.tarifpunkte[orgId][tp]) {
    return KA_DATA.tarifpunkte[orgId][tp]
  } else {
    return tp.toString()
  } 
}

export const efm_produkt = (orgId:number, produktId:number) => {
  if (KA_DATA.efmprodukte[orgId] && KA_DATA.efmprodukte[orgId][produktId]) {
    return KA_DATA.efmprodukte[orgId][produktId]
  } else {
    return produktId.toString()
  } 
}

export enum sBlockTypes {
  "Preismodell" = 1,
  "Produktklasse Gesamtticket" = 2,
  "Produktklasse Hinfahrt" = 3,
  "Produktklasse Rückfahrt" = 4,
  "Passagiere" = 9,
  "Kinder" = 12,
  "Klasse" = 14,
  "H-Start-Bf" = 15,
  "H-Ziel-Bf" = 16,
  "R-Start-Bf" = 17,
  "R-Ziel-Bf" = 18,
  "Vorgangsnr./Flugscheinnr." = 19,
  "Vertragspartner" = 20,
  "VIA" = 21,
  "Personenname" = 23,
  "Preisart" = 26,
  "Ausweis-ID" = 27,
  "Vorname, Name" = 28,
  "Gueltig von" = 31,
  "Gueltig bis" = 32,
  "Start-Bf-ID" = 35,
  "Ziel-Bf-ID" = 36,
  "Anzahl Personen" = 40,
  "TBD EFS Anzahl" = 41
}

export enum id_types {
  "CC" = 1,
  "BC" = 4,
  "EC" = 7,
  "Bonus.card business" = 8,
  "Personalausweis" = 9,
  "Reisepass" = 10,
  "bahn.bonus Card" = 11
}

// exports.TBD0 = new Enum({
//   /* # "00" bei Schönem WE-Ticket / Ländertickets / Quer-Durchs-Land
//   # "00" bei Vorläufiger BC
//   # "02" bei Normalpreis Produktklasse C/B, aber auch Ausnahmen
//   # "03" bei normalem IC/EC/ICE Ticket
//   # "04" Hinfahrt A, Rückfahrt B; Rail&Fly ABC; Veranstaltungsticket; auch Ausnahmen
//   # "05" bei Facebook-Ticket, BC+Sparpreis+neue BC25 [Ticket von 2011]
//   # "18" bei Kauf via Android App */
// })



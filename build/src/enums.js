'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.id_types = exports.sBlockTypes = exports.efm_produkt = exports.tarifpunkt = exports.orgid = void 0;
const tslib_1 = require('tslib');
const ka_data_1 = tslib_1.__importDefault(require('./ka-data'));
const orgid = (orgId) => {
  return ka_data_1.default.org_id[orgId] || orgId.toString();
};
exports.orgid = orgid;
const tarifpunkt = (orgId, tp) => {
  if (ka_data_1.default.tarifpunkte[orgId] && ka_data_1.default.tarifpunkte[orgId][tp]) {
    return ka_data_1.default.tarifpunkte[orgId][tp];
  } else {
    return tp.toString();
  }
};
exports.tarifpunkt = tarifpunkt;
const efm_produkt = (orgId, produktId) => {
  const kvp_organisations_id = (0, exports.orgid)(orgId);
  const produkt_nr =
    ka_data_1.default.efmprodukte[orgId] && ka_data_1.default.efmprodukte[orgId][produktId]
      ? ka_data_1.default.efmprodukte[orgId][produktId]
      : produktId.toString();
  return { kvp_organisations_id, produkt_nr };
};
exports.efm_produkt = efm_produkt;
var sBlockTypes;
(function (sBlockTypes) {
  sBlockTypes[(sBlockTypes['Preismodell'] = 1)] = 'Preismodell';
  sBlockTypes[(sBlockTypes['Produktklasse Gesamtticket'] = 2)] = 'Produktklasse Gesamtticket';
  sBlockTypes[(sBlockTypes['Produktklasse Hinfahrt'] = 3)] = 'Produktklasse Hinfahrt';
  sBlockTypes[(sBlockTypes['Produktklasse R\u00FCckfahrt'] = 4)] = 'Produktklasse R\u00FCckfahrt';
  sBlockTypes[(sBlockTypes['Passagiere'] = 9)] = 'Passagiere';
  sBlockTypes[(sBlockTypes['Kinder'] = 12)] = 'Kinder';
  sBlockTypes[(sBlockTypes['Klasse'] = 14)] = 'Klasse';
  sBlockTypes[(sBlockTypes['H-Start-Bf'] = 15)] = 'H-Start-Bf';
  sBlockTypes[(sBlockTypes['H-Ziel-Bf'] = 16)] = 'H-Ziel-Bf';
  sBlockTypes[(sBlockTypes['R-Start-Bf'] = 17)] = 'R-Start-Bf';
  sBlockTypes[(sBlockTypes['R-Ziel-Bf'] = 18)] = 'R-Ziel-Bf';
  sBlockTypes[(sBlockTypes['Vorgangsnr./Flugscheinnr.'] = 19)] = 'Vorgangsnr./Flugscheinnr.';
  sBlockTypes[(sBlockTypes['Vertragspartner'] = 20)] = 'Vertragspartner';
  sBlockTypes[(sBlockTypes['VIA'] = 21)] = 'VIA';
  sBlockTypes[(sBlockTypes['Personenname'] = 23)] = 'Personenname';
  sBlockTypes[(sBlockTypes['Preisart'] = 26)] = 'Preisart';
  sBlockTypes[(sBlockTypes['Ausweis-ID'] = 27)] = 'Ausweis-ID';
  sBlockTypes[(sBlockTypes['Vorname, Name'] = 28)] = 'Vorname, Name';
  sBlockTypes[(sBlockTypes['Gueltig von'] = 31)] = 'Gueltig von';
  sBlockTypes[(sBlockTypes['Gueltig bis'] = 32)] = 'Gueltig bis';
  sBlockTypes[(sBlockTypes['Start-Bf-ID'] = 35)] = 'Start-Bf-ID';
  sBlockTypes[(sBlockTypes['Ziel-Bf-ID'] = 36)] = 'Ziel-Bf-ID';
  sBlockTypes[(sBlockTypes['Anzahl Personen'] = 40)] = 'Anzahl Personen';
  sBlockTypes[(sBlockTypes['TBD EFS Anzahl'] = 41)] = 'TBD EFS Anzahl';
})(sBlockTypes || (exports.sBlockTypes = sBlockTypes = {}));
var id_types;
(function (id_types) {
  id_types[(id_types['CC'] = 1)] = 'CC';
  id_types[(id_types['BC'] = 4)] = 'BC';
  id_types[(id_types['EC'] = 7)] = 'EC';
  id_types[(id_types['Bonus.card business'] = 8)] = 'Bonus.card business';
  id_types[(id_types['Personalausweis'] = 9)] = 'Personalausweis';
  id_types[(id_types['Reisepass'] = 10)] = 'Reisepass';
  id_types[(id_types['bahn.bonus Card'] = 11)] = 'bahn.bonus Card';
})(id_types || (exports.id_types = id_types = {}));

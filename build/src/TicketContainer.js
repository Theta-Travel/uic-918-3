"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketContainer = void 0;
const tslib_1 = require("tslib");
const TC_U_HEAD_01_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_U_HEAD_01"));
const TC_0080VU_01_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_0080VU_01"));
const TC_1180AI_01_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_1180AI_01"));
const TC_0080BL_02_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_0080BL_02"));
const TC_0080BL_03_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_0080BL_03"));
const TC_0080ID_01_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_0080ID_01"));
const TC_0080ID_02_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_0080ID_02"));
const TC_U_TLAY_01_1 = tslib_1.__importDefault(require("./ticketDataContainers/TC_U_TLAY_01"));
exports.TicketContainer = [
    TC_U_HEAD_01_1.default,
    TC_0080VU_01_1.default,
    TC_1180AI_01_1.default,
    TC_0080BL_02_1.default,
    TC_0080BL_03_1.default,
    TC_0080ID_01_1.default,
    TC_0080ID_02_1.default,
    TC_U_TLAY_01_1.default
];
exports.default = exports.TicketContainer;

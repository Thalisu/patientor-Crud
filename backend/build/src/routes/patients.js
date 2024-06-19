"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const patientService_1 = __importDefault(require("../patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientsRouter = (0, express_1.Router)();
patientsRouter.get("/", (_req, res) => {
    const patients = patients_1.default.map((d) => {
        return {
            id: d.id,
            name: d.name,
            occupation: d.occupation,
            gender: d.gender,
            dateOfBirth: d === null || d === void 0 ? void 0 : d.dateOfBirth,
        };
    });
    (0, logger_1.info)(`get patients`);
    res.json(patients);
});
patientsRouter.post("/", (req, res) => {
    const newPatient = (0, utils_1.default)(req.body);
    (0, patientService_1.default)(newPatient);
    (0, logger_1.info)(`post patient`);
    res.json(newPatient);
});
exports.default = patientsRouter;

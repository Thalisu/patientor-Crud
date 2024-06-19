"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosesRouter = exports.patientsRouter = void 0;
var patients_1 = require("./patients");
Object.defineProperty(exports, "patientsRouter", { enumerable: true, get: function () { return __importDefault(patients_1).default; } });
var diagnoses_1 = require("./diagnoses");
Object.defineProperty(exports, "diagnosesRouter", { enumerable: true, get: function () { return __importDefault(diagnoses_1).default; } });

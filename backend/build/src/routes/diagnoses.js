"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const diagnosesRouter = (0, express_1.Router)();
diagnosesRouter.get("/", (_req, res) => {
    const diagnoses = diagnoses_1.default.map((d) => {
        return {
            code: d.code,
            name: d.name,
            latin: d === null || d === void 0 ? void 0 : d.latin,
        };
    });
    (0, logger_1.info)("get diagnoses");
    res.json(diagnoses);
});
exports.default = diagnosesRouter;

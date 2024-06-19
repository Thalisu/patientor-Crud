"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGender = exports.isGender = exports.parseOptionalString = exports.parseString = exports.isOptionalString = exports.isString = void 0;
const types_1 = require("./types");
const logger_1 = require("./utils/logger");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
exports.isString = isString;
const isOptionalString = (text) => {
    return (typeof text === "string" || text instanceof String || text === undefined);
};
exports.isOptionalString = isOptionalString;
const parseString = (text) => {
    if (!text || !(0, exports.isString)(text)) {
        (0, logger_1.error)(`Incorrect or missing text: ${text}`);
        throw new Error(`Incorrect or missing text: ${text}`);
    }
    return text;
};
exports.parseString = parseString;
const parseOptionalString = (text) => {
    if (!(0, exports.isOptionalString)(text)) {
        (0, logger_1.error)(`Incorrect or missing text: ${text}`);
        throw new Error(`Incorrect or missing text: ${text}`);
    }
    return text;
};
exports.parseOptionalString = parseOptionalString;
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(gender);
};
exports.isGender = isGender;
const parseGender = (gender) => {
    if (!gender || !(0, exports.isString)(gender) || !(0, exports.isGender)(gender)) {
        (0, logger_1.error)(`Incorrect or missing gender: ${gender}`);
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
exports.parseGender = parseGender;
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object && "occupation" in object && "gender" in object) {
        let newEntry = {
            name: (0, exports.parseString)(object.name),
            occupation: (0, exports.parseString)(object.occupation),
            gender: (0, exports.parseGender)(object.gender),
        };
        if ("ssn" in object) {
            newEntry = Object.assign(Object.assign({}, newEntry), { ssn: (0, exports.parseOptionalString)(object.ssn) });
        }
        if ("dateOfBirth" in object) {
            newEntry = Object.assign(Object.assign({}, newEntry), { dateOfBirth: (0, exports.parseOptionalString)(object.dateOfBirth) });
        }
        return newEntry;
    }
    throw new Error("Incorrect data: a field missing");
};
exports.default = toNewPatientEntry;

import {
  NewPatient,
  Gender,
  Entry,
  DiagnosisCodes,
  Type,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "../types";
import logger from "../utils/logger";

export const isString = (string: unknown): string is string => {
  return typeof string === "string" || string instanceof String;
};

export const isOptionalString = (text: unknown): text is string | undefined => {
  return (
    typeof text === "string" || text instanceof String || text === undefined
  );
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};

export const parseOptionalString = (text: unknown): string | undefined => {
  if (!isOptionalString(text)) {
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    logger.error(`Incorrect or missing gender: ${gender}`);
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export const isHospitalEntry = (e: unknown): e is HospitalEntry => {
  const entry = e as HospitalEntry;
  return isString(entry.discharge.date) && isString(entry.discharge.criteria);
};

export const isOccupationalHealthcarEntry = (
  e: unknown
): e is OccupationalHealthcareEntry => {
  const entry = e as OccupationalHealthcareEntry;
  return (
    isString(entry.employerName) &&
    ((entry.sickLeave !== undefined &&
      isString(entry.sickLeave.endDate) &&
      isString(entry.sickLeave.startDate)) ||
      entry.sickLeave === undefined)
  );
};

const isHealthCheckRating = (r: number): r is HealthCheckRating => {
  if (typeof r !== "number") throw new Error("rating must be a number");
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(r);
};

export const isHealthCheckEntry = (e: unknown): e is HealthCheckEntry => {
  const entry = e as HealthCheckEntry;
  return isHealthCheckRating(entry.healthCheckRating);
};

export const isTypeCorrect = (e: Entry): e is Entry => {
  if (
    !Object.values(Type)
      .map((v) => v.toString())
      .includes(e.type)
  ) {
    throw new Error("entry type not exist");
  }
  return (
    (e.type === Type.Hospital && isHospitalEntry(e)) ||
    (e.type === Type.OccupationalHealthcare &&
      isOccupationalHealthcarEntry(e)) ||
    (e.type === Type.HealthCheck && isHealthCheckEntry(e))
  );
};

export const isDiagnosisCode = (codes: unknown): codes is DiagnosisCodes => {
  return (
    codes === undefined ||
    (Array.isArray(codes) && codes.every((code) => typeof code === "string"))
  );
};

export const isEntry = (e: Entry): e is Entry => {
  return (
    e !== null &&
    typeof e === "object" &&
    isString(e.description) &&
    isString(e.date) &&
    isString(e.specialist) &&
    isDiagnosisCode(e.diagnosisCodes) &&
    isTypeCorrect(e)
  );
};

export const isPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("New patient is not an object or is empty");
  }

  if ("name" in object && "occupation" in object && "gender" in object) {
    let newPatient: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
    };
    if ("ssn" in object) {
      newPatient = { ...newPatient, ssn: parseOptionalString(object.ssn) };
    }
    if ("dateOfBirth" in object) {
      newPatient = {
        ...newPatient,
        dateOfBirth: parseOptionalString(object.dateOfBirth),
      };
    }
    if ("entries" in object) {
      if (!Array.isArray(object.entries)) {
        throw new Error(`entries is not an array`);
      }
      if (
        !object.entries.every((e: Entry) => isEntry(e)) &&
        object.entries.length > 0
      )
        throw new Error(`one or more entry is not an valid entry`);
      newPatient = { ...newPatient, entries: object.entries };
    } else {
      console.log("a");
      newPatient = {
        ...newPatient,
        entries: [],
      };
    }
    return newPatient;
  }
  throw new Error("Incorrect data: a field missing");
};

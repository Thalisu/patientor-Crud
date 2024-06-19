import { NewPatient, Gender } from "./types";
import { error } from "./utils/logger";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isOptionalString = (text: unknown): text is string | undefined => {
  return (
    typeof text === "string" || text instanceof String || text === undefined
  );
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    error(`Incorrect or missing text: ${text}`);
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};

export const parseOptionalString = (text: unknown): string | undefined => {
  if (!isOptionalString(text)) {
    error(`Incorrect or missing text: ${text}`);
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
    error(`Incorrect or missing gender: ${gender}`);
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "occupation" in object && "gender" in object) {
    let newEntry: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
    };
    if ("ssn" in object) {
      newEntry = { ...newEntry, ssn: parseOptionalString(object.ssn) };
    }
    if ("dateOfBirth" in object) {
      newEntry = {
        ...newEntry,
        dateOfBirth: parseOptionalString(object.dateOfBirth),
      };
    }
    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;

export type Obj = Record<string, unknown>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum Type {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export type DiagnosisCodes = Array<Diagnosis["code"]>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  type: Type;
  diagnosisCodes?: DiagnosisCodes;
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

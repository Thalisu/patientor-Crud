import data from "../../data/patients";
import { Router } from "express";
import { Gender, Patient } from "../types";
import logger from "../utils/logger";
import addPatient from "../patientService";
import toNewPatientEntry from "../utils";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients = data.map((d): Patient => {
    return {
      id: d.id,
      name: d.name,
      occupation: d.occupation,
      gender: d.gender as Gender,
      dateOfBirth: d?.dateOfBirth,
    };
  });

  logger.info(`get patients`);
  res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = data.find((x) => x.id === id);

  logger.info(`get patient of id: ${id}`);
  res.json(patient);
});

patientsRouter.post("/", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  addPatient(newPatient);
  logger.info(`post patient`);
  res.json(newPatient);
});

export default patientsRouter;

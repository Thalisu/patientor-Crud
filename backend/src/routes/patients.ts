import data from "../../data/patients";
import { Router } from "express";
import { Gender, Patient } from "../types";
import { info } from "../utils/logger";
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

  info(`get patients`);
  res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = data.find((x) => x.id === id);

  info(`get patient of id: ${id}`);
  res.json(patient);
});

patientsRouter.post("/", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  addPatient(newPatient);
  info(`post patient`);
  res.json(newPatient);
});

export default patientsRouter;

import data from "../../data/patients";
import { Router } from "express";
import { Gender, Patient as PatientType } from "../types";
import logger from "../utils/logger";
import Patient from "../models/patient";
import { isPatient } from "../utils/typeguards";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients = data.map((d): PatientType => {
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.post("/", async (req, res) => {
  let newPatient;
  try {
    newPatient = isPatient(req.body);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error).end();
  }
  try {
    const patient = new Patient(newPatient);
    const response = await patient.save();
    res.status(201).json(response).end();
  } catch (error) {
    res.status(502).send(error).end();
  }
});

export default patientsRouter;

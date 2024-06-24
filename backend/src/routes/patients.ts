import { Router } from "express";
import logger from "../utils/logger";
import Patient from "../models/patient";
import { isPatient } from "../utils/typeguards";

const patientsRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.get("/", async (_req, res) => {
  const patients = await Patient.find({});

  logger.info(`get patients`);
  res.json(patients);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.get("/:id", async (req, res) => {
  //.populate("user", { username: 1, name: 1 })
  const id = req.params.id;
  const patient = await Patient.findById(id);
  res.json(patient).end();
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.put("/:id", async (req, res) => {
  let newPatient;
  const id = req.params.id;
  try {
    newPatient = isPatient(req.body);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error).end();
  }
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, newPatient, {
      new: true,
    });
    res.json(updatedPatient).end();
  } catch (error) {
    res.status(502).send(error).end();
  }
});

export default patientsRouter;

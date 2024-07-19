import { Router } from "express";
import Patient from "../models/patient";
import {
  PartialPatient,
  Patient as PatientType,
  Entry as EntryType,
} from "../types";

const patientsRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.get("/", async (_req, res) => {
  const patients = await Patient.find({});

  res.json(patients);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const patient = await Patient.findById(id);
  res.json(patient).end();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.post("/", async (req, res) => {
  const newPatient = req.body as PatientType;
  try {
    const patient = new Patient(newPatient);
    const response = await patient.save();
    res.status(201).json(response).end();
  } catch (error) {
    res.status(502).send(error).end();
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.post("/:id/entries", async (req, res) => {
  const id = req.params.id;
  try {
    const entry = req.body as EntryType;
    const patient = await Patient.findByIdAndUpdate(
      id,
      { $push: { entries: entry } },
      { new: true, runValidators: true }
    );
    res.status(201).json(patient).end();
  } catch (error) {
    res.status(502).send(error).end();
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const patient = req.body as PartialPatient;
  if ("entries" in patient) {
    delete patient.entries;
  }
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, patient, {
      new: true,
    });
    res.json(updatedPatient).end();
  } catch (error) {
    res.status(502).send(error).end();
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
patientsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Patient.findByIdAndDelete(id);
  res.status(204).end();
});

export default patientsRouter;

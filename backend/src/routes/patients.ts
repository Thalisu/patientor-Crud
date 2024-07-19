import { Router } from "express";
import Patient from "../models/patient";
import { PartialPatient, Patient as PatientType } from "../types";

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
patientsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const patientEntry = req.body as PartialPatient;
  const oldPatient = await Patient.findById(id);
  if (!oldPatient) {
    res.status(404).send("Patient not found");
  }
  const newPatient = { ...oldPatient?.toObject(), ...patientEntry };
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, newPatient, {
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

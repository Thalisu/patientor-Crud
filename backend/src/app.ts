import express from "express";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

export default app;

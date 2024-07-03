import express from "express";
import helmet from "helmet";
import cors from "cors";
import { diagnosesRouter, patientsRouter } from "./routes";

import mongoose from "mongoose";

import logger from "./utils/logger";
import config from "./utils/config";

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.static("dist"));

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

export default app;

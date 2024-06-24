import { Router } from "express";
import logger from "../utils/logger";
import Diagnose from "../models/diagnose";

const diagnosesRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
diagnosesRouter.get("/", async (_req, res) => {
  const diagnoses = await Diagnose.find({});

  logger.info(`get diagnoses`);
  res.json(diagnoses);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
diagnosesRouter.get("/:code", async (req, res) => {
  const code = req.params.code;

  const diagnosis = await Diagnose.findOne({ code });

  if (diagnosis) {
    logger.info(`get diagnose name`);
    res.json(diagnosis.name);
  } else {
    res.status(404).send("Not Found").end();
  }
});

export default diagnosesRouter;

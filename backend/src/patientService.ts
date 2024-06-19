import data from "../data/patients";
import { NewPatient, Patient } from "./types";
import { v1 as uuid } from "uuid";

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuid(),
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

export default addPatient;

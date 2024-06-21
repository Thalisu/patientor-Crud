import mongoose from "mongoose";
import entrySchema from "./entry";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirt: {
    type: String,
  },
  ssn: {
    type: String,
  },
  entries: [entrySchema],
});

patientSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

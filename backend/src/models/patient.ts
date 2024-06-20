import mongoose from "mongoose";

const baseEntry = {
  id: String,
  description: String,
  date: String,
  specialist: String,
  type: String,
  diagnosisCodes: [String],
};

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
  entries: {
    type: [
      {
        baseEntry,
        hospitalEntry: {
          type: {
            date: String,
            criteria: String,
          },
        },
        occupationalHealthcareEntry: {
          type: {
            employerName: String,
            sickLeave: {
              type: {
                startDate: String,
                endDate: String,
              },
            },
          },
        },
        HealthCheckRating: Number,
      },
    ],
    required: true,
  },
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

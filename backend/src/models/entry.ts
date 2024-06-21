import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  diagnosisCodes: {
    type: [String],
    required: true,
  },
  discharge: {
    type: {
      date: { type: String },
      criteria: { type: String },
    },
    _id: false,
  },
  employerName: { type: String },
  sickLeave: {
    type: {
      startDate: { type: String },
      endDate: { type: String },
    },
    _id: false,
  },
  HealthCheckRating: { type: Number },
});

entrySchema.pre("validate", function (next) {
  if (this.type === "Hospital") {
    this.employerName = undefined;
    this.sickLeave = undefined;
    this.HealthCheckRating = undefined;
  } else if (this.type === "OccupationalHealthcare") {
    this.discharge = undefined;
    this.HealthCheckRating = undefined;
  } else if (this.type === "HealthCheck") {
    this.discharge = undefined;
    this.employerName = undefined;
    this.sickLeave = undefined;
  } else {
    this.discharge = undefined;
    this.employerName = undefined;
    this.sickLeave = undefined;
    this.HealthCheckRating = undefined;
  }
  next();
});

export default entrySchema;

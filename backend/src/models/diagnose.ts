import mongoose from "mongoose";

const diagnoseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latin: {
    type: String,
  },
});

const Diagnose = mongoose.model("Diagnose", diagnoseSchema);

export default Diagnose;

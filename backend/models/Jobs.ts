import { Schema, model } from "mongoose";

const EmployerSchema = new Schema({
  companyName: {
    type: String,
  },
});

const JobsSchema = new Schema({
  jobTitle: String,
  jobRequirements: String,
  employer: [EmployerSchema],
  budget: String,
  noticePeriod: Number,
  isDeleted: { type: Boolean, default: false },
});

const Jobs = model("jobs", JobsSchema);

export default Jobs;

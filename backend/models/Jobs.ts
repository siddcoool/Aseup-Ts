import mongoose, { Schema, model } from "mongoose";



const JobsSchema = new Schema({
  jobTitle: String,
  jobRequirements: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'employer' },
  budget: String,
  noticePeriod: Number,
  isDeleted: { type: Boolean, default: false },
});

const Jobs = model("jobs", JobsSchema);

export default Jobs;

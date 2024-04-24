import mongoose, { Schema, model } from "mongoose";

const JobsSchema = new Schema({
  jobTitle: String,
  jobRequirements: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'employer' },
  budget: String,
  noticePeriod: Number,
  isDeleted: { type: Boolean, default: false },
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'skill'}]
},{timestamps:true});

const Jobs = model("jobs", JobsSchema);

export default Jobs;
  
import mongoose, { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  jobs: { type: mongoose.Schema.Types.ObjectId, ref: "jobs" },

  employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  isDeleted:Boolean
});

const Application = model("application", ApplicationSchema);

export default Application;

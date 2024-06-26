import mongoose, { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "jobs" },

  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

const Application = model("application", ApplicationSchema);

export default Application;

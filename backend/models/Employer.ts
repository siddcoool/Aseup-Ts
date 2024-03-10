import mongoose, { Schema, model } from "mongoose";

const EmployerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employees: String,
  isDeleted: Boolean
});

const Employer = model("employer", EmployerSchema);
export default Employer;

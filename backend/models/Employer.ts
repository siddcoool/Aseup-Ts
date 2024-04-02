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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  contactName: [{
    type: String,
    required: true,
  }],
  contactNumber:  [{
    type: String,
    required: true,
  }],
},{timestamps:true});

const Employer = model("employer", EmployerSchema);
export default Employer;

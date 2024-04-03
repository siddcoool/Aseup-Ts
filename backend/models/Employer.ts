import mongoose, { Schema, model } from "mongoose";


const ContactSchema = new Schema({
  contactName: String,
  contactNumber: String
})


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
  contact: [ContactSchema]
 
},{timestamps:true});

const Employer = model("employer", EmployerSchema);
export default Employer;

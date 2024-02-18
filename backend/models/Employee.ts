import dayjs from "dayjs";
import mongoose, { Model, Schema, model } from "mongoose";


const EducationSchema = new Schema({
    title: String,
    field: String,
    institute: String,
    startYear: { type: Date, default: dayjs().toISOString() },  // Year of starting the course/study.
    endYear: { type: Date, default: dayjs().toISOString() },
    grade: {enum: ['A','B','C','D','E','F']} 

})

const ExperienceSchema = new Schema({
    companyName: String,
    positionHeld: String,
    roleDescription: String,
    startDate: { type: Date, default: dayjs().toISOString() },   // Start date of employment in format yyyy-mm
    endDate: { type: Date, default: dayjs().toISOString() },
    employmentType : {enum : ['Contract', 'Full-Time','Part-Time'] }     // End date of employment or null if current employee
})

const EmployeeSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    DOB: { type: Date, default: dayjs().toISOString() },
    gender: String,
    educations: [EducationSchema],
    experience: [ExperienceSchema],
    currentCTC: String, 
    expectedCTC: String,
    noticePeriod: String,
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skill' }]
})

const Employee = model('employee',EmployeeSchema)
export default Employee;

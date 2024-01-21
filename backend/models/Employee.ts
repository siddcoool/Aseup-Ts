import mongoose, { Model, Schema, model } from "mongoose";


const EducationSchema = new Schema({
    title: String,
    field: String,
    institute: String,
    startYear: Number,  // Year of starting the course/study.
    endYear: Number,
    grade: {enum: ['A','B','C','D','E','F']} 

})

const ExperienceSchema = new Schema({
    companyName: String,
    positionHeld: String,
    roleDescription: String,
    startDate: Date,   // Start date of employment in format yyyy-mm
    endDate: Date,
    employmentType : {enum : ['Contract', 'Full-Time','Part-Time'] }     // End date of employment or null if current employee
})

const EmployeeSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    DOB: Date,
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

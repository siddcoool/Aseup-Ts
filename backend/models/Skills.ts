import { Document, model, Schema, } from "mongoose";   

const SkillSchema = new Schema({
    label: String,
})

const Skill = model('skill', SkillSchema)

export default Skill
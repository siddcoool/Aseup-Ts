import { Document, model, Schema, } from "mongoose";   

const SkillSchema = new Schema({
    name: String
})

const Skill = model('skill', SkillSchema)

export default Skill
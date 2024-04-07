import { Document, model, Schema, } from "mongoose";   

const SkillSchema = new Schema({
    name: String
},{timestamps:true})

const Skill = model('skill', SkillSchema)

export default Skill
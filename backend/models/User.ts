import { Document, Model, model, Types, Schema, Query } from "mongoose"

const UserSchema = new Schema({
        name : String,
        email : String,
        password : String,
        gender : String
})
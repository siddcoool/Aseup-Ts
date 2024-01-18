import { Document, Model, model, Types, Schema, Query } from "mongoose"
import bcrypt from "bcrypt";

const UserSchema = new Schema({
        name : String,
        email : String,
        password : String,
        gender : String,
        isDeleted : Boolean
})

UserSchema.methods.comparePassword = function(candidatePassword: string){
        const currentPassword = this.password
        return new Promise((resolve, reject)=>{
            bcrypt.compare(candidatePassword, currentPassword, function (err: any, isMatch: unknown){
                if(err) return reject(err)
                resolve(isMatch)
            })
        })
    }

const User = model('user', UserSchema)

export default User
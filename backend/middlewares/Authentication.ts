import TokenManagement from "../lib/Token"
import { NextFunction, Request, Response } from 'express'
import User from '../models/User'

class Authentication{
    constructor(){}

    static async Admin(req:Request, res:Response, next:NextFunction){
        try {
            const token = req.headers.access_token 
            if(!token){
                throw new Error('Token not present')
            }
            const user: any = await TokenManagement.verify(token as string)
            req.context = {
                user : await User.findById(user._id )
            }
            next()
        } catch (error:any) {
            res.status(401).send({
                message: error.message
            })
        }
    }
}
module.exports = Authentication



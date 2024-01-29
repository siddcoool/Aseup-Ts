import { resolve } from "path"

import jwt from "jsonwebtoken"

const secret = process.env.SECRET??"hello"

class Token {
    constructor(){}

    createToken(payload : any){
        return jwt.sign(payload, secret,{expiresIn: '2h'})
    }

    verify(token:string){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, secret, (err : any, payload : any)=>{
                if(err) reject(err)
                else resolve(payload)
            })
        })
    }
}
const TokenManagement = new Token()
export default TokenManagement
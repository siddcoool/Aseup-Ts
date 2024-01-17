import {Router, Request, Response} from 'express'
const express = require('express')
const userRouter = express.Router()
const User = require('..models/User.ts')

userRouter.get('/', async (req : Request , res: Response)=> {
    const users = await User.find()
    res.send(users)
})

userRouter.post('/login', async (req : Request, res : Response)=>{
    const body = req.body
    const user = await User.findOne({email : body.email})

    if(!user){
        res.status(404).json({message: 'user not found '})
    }

    const isValid = await user.comparePassword(body.password)
    if(!isValid){
        res.status(401).json({message : 'login failed'})
    }
    res.json({
        message: 'login success',
        user
    })

})

// userRouter.post('/register'){
    
// }

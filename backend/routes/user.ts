import {Router, Request, Response} from 'express'
const userRouter = Router()
import User from '../models/User'

userRouter.get('/', async (req : Request , res: Response)=> {
    const users = await User.find()
    res.send(users)
})

userRouter.post('/login', async (req : Request, res : Response)=>{
    const body = req.body
    const user = await User.findOne({email : body.email})

    if(!user){
        return res.status(404).json({message: 'user not found '})
    }

    // const isValid = await user.comparePassword(body.password)
    // if(!isValid){
    //     res.status(401).json({message : 'login failed'})
    // }
    res.json({
        message: 'login success',
        user
    })

})

userRouter.post('/register', async(req : Request, res : Response)=>{
     const body = req.body
     const existingUser = await User.findOne({email: body.email})
})


export default userRouter

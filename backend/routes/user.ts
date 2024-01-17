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
     if(!existingUser){
        const user = await User.create(body)
        res.status(200).json({
            message : 'user created successfully',
            user : {
                id : user._id,
                name : user.name,
                email : user.email
            }
        })
     }
     else{
         res.status(400).json({message:"user already exists"})
     }
})

// userRouter.get('/me', async (req : Request, res : Response)=>{
//     res.json(req.context.user)
// })

userRouter.get('/:id', async(req : Request, res : Response)=>{
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
})

userRouter.put('/:id', async(req : Request, res : Response)=>{
    const id = req.params.id
    const {email , password} = req.body

    const newEntry = {
        email, password
    }

    const user = User.findByIdAndUpdate(newEntry)
    res.json(user)
})




export default userRouter

import {Router, Request, Response} from 'express'
const userRouter = Router()
import User from '../models/User'

userRouter.get('/', async (req : Request , res: Response)=> {
    const users = await User.find()
    res.send(users)
})

userRouter.post('/login', async (req : Request, res : Response)=>{
    const user = await User.findOne({email : req.body.email})
    // const user = await User.findById(req.params.id)
    console.log(req.body)
    try {
        if(!user){
            return res.status(404).json({message: 'user not found '})
        }
        else{
            res.json({
                message: 'login success',
                user
            })
        }
    } catch (error) {
        console.log(error)
    }
    

})

userRouter.post('/register', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email: body?.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create(body);

        // Send a success response
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Send an error response
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


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

userRouter.delete('/:id', async(req: Request, res: Response)=>{
    const id = req.params.id
    const newEntry = {
        isDeleted : true
    }
    const user = await User.findByIdAndUpdate(newEntry)
    res.json(User)
})




export default userRouter

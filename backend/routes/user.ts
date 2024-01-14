import {Router, Request, Response} from 'express'
const userRouter = express.Router()

userRouter.get('/', async (req : Request , res: Response)=> {
    const users = await User.find()
    res.send(users)
})


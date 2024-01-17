import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import './config/database';
import userRouter from './routes/user';


dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.get('/', (req : Request, res: Response)=>{
    res.send("Typescript server")
})

app.use('/user', userRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
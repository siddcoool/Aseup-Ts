import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import './config/database';
import userRouter from './routes/user';
import skillRouter from './routes/skill';
import bodyParser from 'body-parser';
import tokenRouter from './routes/token'
import cors from 'cors'



dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json());

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
app.get('/', (req : Request, res: Response)=>{
    res.send("Typescript server")
})

app.use('/token', tokenRouter)
app.use('/user', userRouter)
app.use('/skill', skillRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
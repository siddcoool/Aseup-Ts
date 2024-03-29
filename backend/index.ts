import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.get('/', (req : Request, res: Response)=>{
    res.send("Typescript server")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
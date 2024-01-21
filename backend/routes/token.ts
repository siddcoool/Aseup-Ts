import { Request, Response, Router } from "express"
import TokenManagement from "../lib/Token"
const tokenRouter = Router()
tokenRouter.get('/', async (req: Request, res: Response)=>{
    const token = req.headers.access_token
    try {
        const user = await TokenManagement.verify(token : string)


    } catch (error) {
        
    }
})
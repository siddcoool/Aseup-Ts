import { Request, Response, Router } from "express"
import TokenManagement from "../lib/Token"
const tokenRouter = Router()
tokenRouter.get('/', async (req: Request, res: Response)=>{
    const token = req.headers.access_token
    try {
        const user: any = await TokenManagement.verify(token as string)
        delete user.iat
        delete user.exp
        const newToken = TokenManagement.createToken(user)
        res.send(newToken)

    } catch (error) {
            res.send(401).send()
    }
})

export default  tokenRouter
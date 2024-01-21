import { Request, Response,Router } from "express";
const skillRouter = Router()
import Skill from '../models/Skills'

skillRouter.get('/', async(req: Request, res: Response)=>{
    const listOfSkills = await Skill.find()
    res.json(listOfSkills)
})

skillRouter.post('/create', async(req: Request, res: Response)=>{
    const {skills} = req.body
    const newEntry = {
        skills
    }
    await Skill.create(skills)
    res.json({message:"skill added"})
})

skillRouter.put('/update', async(req: Request, res: Response)=>{
    const {skill} = req.body
    const newEntry = {
        skill
    }
    await Skill.updateOne(newEntry)
})

skillRouter.delete('/:id', async(req: Request, res: Response)=>{
    const id = req.params.id

    await Skill.findByIdAndDelete(id)
    res.json({message:"Skill deleted"})
})

export default skillRouter
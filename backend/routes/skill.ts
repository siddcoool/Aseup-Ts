import { Request, Response, Router } from "express";
const skillRouter = Router();
import Skill from "../models/Skills";

skillRouter.get("/", async (req: Request, res: Response) => {
  const listOfSkills = await Skill.find();
  res.json(listOfSkills);
});

skillRouter.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const alreadyExist = await Skill.findOne({ name: name });
  if (alreadyExist) {
    res.status(204).json({ message: "Skill already exist" });
  } else {
    const newEntry = {
      name,
    };
    await Skill.create(newEntry);
    res.json({ message: "skill added" });
  }
});

skillRouter.put("/update", async (req: Request, res: Response) => {
  const { skill } = req.body;
  const newEntry = {
    skill,
  };
  await Skill.updateOne(newEntry);
});

skillRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  await Skill.findByIdAndDelete(id);
  res.json({ message: "Skill deleted" });
});

export default skillRouter;

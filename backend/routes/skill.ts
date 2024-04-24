import { Request, Response, Router } from "express";
const skillRouter = Router();
import Skill from "../models/Skills";

skillRouter.get("/", async (req: Request, res: Response) => {
  const { pageLimit, pageNumber } = req.query;
  const parsedPageLimit = pageLimit ? parseInt(pageLimit as string, 10) : 10; // Default to 10 if pageLimit is not provided
  const parsedSkip = pageNumber ? parseInt(pageNumber as string, 10) : 0; // Default to 0 if skip is not provided
  const count = await Skill.count();
  const listOfSkills = await Skill.find().sort({ updatedAt: -1 }).limit(parsedPageLimit).skip(parsedPageLimit * parsedSkip);
  res.json({listOfSkills, count});
});

skillRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.send(skill);
  } catch (error) {
    res.send((error as Error).message);
  }
});

skillRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const alreadyExist = await Skill.findOne({ name: name });
    if (alreadyExist) {
      res.status(204).json({ message: "Skill already exist" });
    } else {
      const newEntry = {
        name,
      };
      const skill = await Skill.create(newEntry);
      res.json({ message: "skill added", skill });
    }
  } catch (error) {
    res.status(500);
  }
});

skillRouter.put("/:id", async (req: Request, res: Response) => {
  const { name } = req.body;
  const newEntry = {
    name,
  };
  await Skill.findByIdAndUpdate(req.params.id, newEntry);
  res.status(200).json({ message: "skill updated successfully" });
});

skillRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  await Skill.findByIdAndDelete(id);
  res.json({ message: "Skill deleted" });
});

export default skillRouter;

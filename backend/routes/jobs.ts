import { Request, Response, Router } from "express";
import Jobs from "../models/Jobs";

const jobRouter = Router();

jobRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { pageLimit, pageNumber } = req.query;
    const parsedPageLimit = pageLimit ? parseInt(pageLimit as string, 10) : 10; // Default to 10 if pageLimit is not provided
    const parsedSkip = pageNumber ? parseInt(pageNumber as string, 10) : 0; // Default to 0 if skip is not provided
    const count = await Jobs.count({ isDeleted: false });
    const jobs = await Jobs.find({ isDeleted: false })
      .sort({ updatedAt: -1 })
      .limit(parsedPageLimit)
      .skip(parsedPageLimit * parsedSkip);

    res.send({jobs,count});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await Jobs.count();
    res.json({ count });
  } catch (error) {
    return res.status(500).json({ Error: "count not found" });
  }
});

jobRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const job = await Jobs.findById(req.params.id).populate([
      "skills",
      "employer  ",
    ]);
    if (job) {
      res.send(job);
    } else {
      res.send(404).json({ message: "job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { employer, skills } = req.body;
    const employerId = employer.value;
    let newSkills = [];
    newSkills = skills.map((oneSkill: any) => oneSkill.value);
    const newJob = { ...req.body, employer: employerId, skills: newSkills };
    const createdJob = await Jobs.create(newJob);
    res.status(201).json({ message: "new job created", createdJob });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body);
    res.send(updatedJob);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (job) {
      job.isDeleted = true;
      await job.save();
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default jobRouter;

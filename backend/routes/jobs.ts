import { Request, Response, Router } from "express";
import Jobs from "../models/Jobs";

const jobRouter = Router();

jobRouter.get("/", async (req: Request, res: Response) => {
  try {
    const jobs = await Jobs.find({ isDeleted: false });
    res.send(jobs);
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
    const job = await Jobs.findById(req.params.id);
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
    await Jobs.create(req.body);
    res.status(201).json({ message: "new job created" });
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

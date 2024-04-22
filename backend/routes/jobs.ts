import { Request, Response, Router } from "express";
import Jobs from "../models/Jobs";
import Employee from "../models/Employee";
import mongoose from "mongoose";

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

jobRouter.get("/recommended-employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const recommendedEmployees = await Jobs.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "skills",
          foreignField: "skills",
          as: "matchedEmployees",
        },
      },
      {
        $project: {
          title: 1,
          matchedEmployees: {
            $filter: {
              input: "$matchedEmployees",
              cond: {
                $gte: [
                  { $size: { $setIntersection: ["$skills", "$$this.skills"] } },
                  3,
                ],
              },
            },
          },
        },
      },
    ]);

    // Correcting the filtering logic for recommended employees
    // const recommendedEmployee = employees.filter(
    //   (employee) =>
    //     employee.skills.filter((skill) => job.skills.includes(skill)).length > 3
    // );
    res
      .status(200)
      .json({ message: "Recommended Employees", recommendedEmployees });
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

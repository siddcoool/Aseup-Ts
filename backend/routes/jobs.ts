import { Request, Response, Router } from "express";
import Jobs from "../models/Jobs";
import Employee from "../models/Employee";
import mongoose from "mongoose";

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
      .skip(parsedPageLimit * parsedSkip).populate('employer');

      const recommendedEmployees = await Jobs.aggregate([
        {
          $match: {
            skills: { $exists: true, $ne: null } // Filter out documents where "skills" is null
          }
        },
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
                  $and: [
                    { $isArray: "$$this.skills" }, // Check if "skills" array exists in matched employee
                    {
                      $gte: [
                        { $size: { $setIntersection: ["$skills", "$$this.skills"] } },
                        1,
                      ],
                    }
                  ]
                },
              },
            },
          },
        },
        {
          $addFields: {
            matchedEmployees: {
              $map: {
                input: "$matchedEmployees",
                as: "employee",
                in: {
                  $mergeObjects: [
                    "$$employee",
                    { _id: "$_id" } // Set the _id field of the employee to the jobid
                  ]
                }
              }
            }
          }
        }
      ]);
      

    res.send({jobs,count,recommendedEmployees});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await Jobs.count({ isDeleted: false });
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
      res.status(404).json({ message: "job not found" });
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
        $match: {
          skills: { $exists: true, $ne: null } // Filter out documents where "skills" is null
        }
      },
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
                $and: [
                  { $isArray: "$$this.skills" }, // Check if "skills" array exists in matched employee
                  {
                    $gte: [
                      { $size: { $setIntersection: ["$skills", "$$this.skills"] } },
                      1,
                    ],
                  }
                ]
              },
            },
          },
        },
      },
      {
        $addFields: {
          matchedEmployees: {
            $map: {
              input: "$matchedEmployees",
              as: "employee",
              in: {
                $mergeObjects: [
                  "$$employee",
                  { _id: "$_id" } // Set the _id field of the employee to the jobid
                ]
              }
            }
          }
        }
      }
    ]);
    

    res
      .status(200)
      .json({ message: "Recommended Employees", recommendedEmployees });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

jobRouter.post("/", async (req: Request, res: Response) => {
  try {
    const createdJob = await Jobs.create(req.body);
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

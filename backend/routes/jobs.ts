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
      .skip(parsedPageLimit * parsedSkip)
      .populate("employer");

    const recommendedEmployees = await Jobs.aggregate([
      {
        $match: {
          skills: { $exists: true, $ne: null }, // Filter out documents where "skills" is null
        },
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
                      {
                        $size: {
                          $setIntersection: ["$skills", "$$this.skills"],
                        },
                      },
                      1,
                    ],
                  },
                ],
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
                  { _id: "$_id" }, // Set the _id field of the employee to the jobid
                ],
              },
            },
          },
        },
      },
    ]);

    res.send({ jobs, count });
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

jobRouter.get("/recommended-employee/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const recommendedEmployees = await Jobs.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(jobId) // Filter by the specific job ID
        }
      },
      {
        $unwind: '$skills' // Flatten the skills array
      },
      {
        $lookup: {
          from: "employees",
          let: { jobSkills: "$skills" }, // Use a $let variable to store the job's skill IDs
          pipeline: [
            {
              $unwind: "$skills" // Flatten the skills array for employees
            },
            {
              $match: {
                $expr: { $in: ["$skills", ["$$jobSkills"]] } // Wrap $$jobSkills in an array
              }
            },
            {
              $group: {
                _id: "$_id", // Group by employee ID
                // You may include other fields from the employee document here
              }
            }
          ],
          as: "matchedEmployees"
        }
      },
      {
        $unwind: "$matchedEmployees" // Unwind the matchedEmployees array
      },
      {
        $group: {
          _id: "$_id", // Group by job ID
          title: { $first: "$jobTitle" }, // Get the job title
          matchedEmployees: { $push: "$matchedEmployees" } // Collect the matched employees
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "matchedEmployees._id",
          foreignField: "_id",
          as: "matchedEmployees"
        }
      },
      {
        $addFields: {
          matchedEmployees: {
            $map: {
              input: "$matchedEmployees",
              as: "employee",
              in: "$$employee"
            }
          }
        }
      }
    ]);
    
    // Now, recommendedEmployees will contain the populated matchedEmployees array with employee details
    
    
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

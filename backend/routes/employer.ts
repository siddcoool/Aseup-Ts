import { Request, Response, Router } from "express";
import Employer from "../models/Employer";

const employerRouter = Router();

employerRouter.get("/", async (req: Request, res: Response) => {
  try {
    const employer = await Employer.find();
    res.send(employer);
  } catch (error: any) {
    res.send(error.message);
  }
});

employerRouter.post("/", async (req: Request, res: Response) => {
  try {
    const employer = await Employer.create(req.body);
    res.send(employer);
  } catch (error: any) {
    res.send(error.message);
  }
});

employerRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const ID = req.params.id;
    if (ID) {
      await Employer.findByIdAndUpdate(ID, req.body);
      res.status(200).json({ message: "Employer updated successfully" });
    } else {
      res.send(400).json({ message: "Employer does not exist" });
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

employerRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const ID = req.params.id;
    if (ID) {
      const employer = await Employer.findById(ID);
      if (employer) {
        employer.isDeleted = true;
        employer.save();
        res.status(200).json({ message: "Employer deleted successfully" });
      }
    } else {
      res.send(400).json({ message: "Employer does not exist" });
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

export default employerRouter

import { Router, application } from "express";
import Application from "../models/Application";

const applicationRouter = Router();

applicationRouter.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("job");

    res.status(200).send(applications);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});
applicationRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Application.findById(id);
    res.status(200).send(application);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});
applicationRouter.post("/", async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(200).send(application);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});
applicationRouter.delete("/:id",async(req,res)=>{
  try {
    const id=req.params.id
    const deletejob=await Application.findById(id)
  } catch (error) {
    
  }
})

export default applicationRouter;

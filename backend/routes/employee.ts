import { Request, Response, Router } from "express";

const employeeRouter = Router();

import Employee from "../models/Employee";

employeeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.find().populate('skills');
    res.status(200).json({
      message: "list of employee",
      data: employee,
    });
  } catch (error) {
    console.log(error);
  }
});
// Getting total employee count
employeeRouter.get('/count',async(req:Request,res:Response)=>{
  try{
    const count=await Employee.count();
    res.json({count});
  }catch(error){
    return res.status(500).json({Error:"count not found"})
  }
})

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('skills');
    res.json(employee);
  } catch (error) {
    console.log(error);
  }
});

employeeRouter.post("/", async (req: Request, res: Response) => {
  const newSkills = req.body.skills.map((skill:any) => skill.value)
  
  const employeeDetails = {...req.body, skills: newSkills};
  try {
    await Employee.create(employeeDetails);
    res.status(201).json({ message: "Employee Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// Delete an employee by ID
employeeRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


employeeRouter.put("/edit/:id", async (req: Request, res: Response) => {
  const ID = req.params.id;
  const newSkills = req.body.skills.map((skill:any) => skill.value)
  
  const employeeDetails = {...req.body, skills: newSkills};
  try {
    const result = await Employee.findByIdAndUpdate(ID, employeeDetails);

    if (!result) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(204).json({ message: "Employee details updated successfully" });
  } catch (error) {
    console.error("Error in updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default employeeRouter;

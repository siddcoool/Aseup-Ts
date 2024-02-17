import { Request, Response, Router } from "express";

const employeeRouter = Router();

import Employee from "../models/Employee";

employeeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.find();
    res.status(200).json({
      message: "list of employee",
      data: employee,
    });
  } catch (error) {
    console.log(error);
  }
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

employeeRouter.post("/", async (req: Request, res: Response) => {
  const employeeDetails = req.body;
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
  const employeeid = req.params.id;
  const {
    Name,
    email,
    phoneNumber,
    DOB,
    gender,
    currentCTC,
    expectedCTC,
    noticePeriod,
  } = req.body;
  // need to add skills and education and experience
  const newDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
  };
});

export default employeeRouter;

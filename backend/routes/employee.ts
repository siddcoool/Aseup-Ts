import { Request, Response, Router } from "express";

const employeeRouter = Router()

import Employee from "../models/Employee";

employeeRouter.get('/:id', async (req: Request, res: Response) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee)
})

employeeRouter.post('/add', async (req: Request, res: Response) => {
    const employeeDetails = req.body
    try {
        await Employee.create(employeeDetails)
    } catch (error) {
        console.log(error)
    }
})
    
employeeRouter.put('/edit/:id', async (req: Request, res: Response) => {
    const employeeid = req.params.id
    const { Name, email, phoneNumber, DOB, gender, currentCTC, expectedCTC, noticePeriod } = req.body
    // need to add skills and education and experience
    const newDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role
    };
}
    // await Employee.findByIdAndUpdate
})
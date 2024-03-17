import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "./config/database";
import userRouter from "./routes/user";
import skillRouter from "./routes/skill";
import tokenRouter from "./routes/token";
import cors from "cors";
import employeeRouter from "./routes/employee";
import employerRouter from "./routes/employer";
import { Authentication } from "./middlewares/Authentication"
import morgan from "morgan";

dotenv.config(); 

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'))

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript server");
});

app.use(cors());
app.use("/token", tokenRouter);
app.use("/user", userRouter);
app.use("/skill",Authentication.Admin, skillRouter);
app.use("/employee", Authentication.Admin, employeeRouter);
app.use("/employer", Authentication.Admin, employerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

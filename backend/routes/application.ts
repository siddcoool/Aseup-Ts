import { Router } from "express";
import Application from "../models/Application";

const applicationRouter = Router();

applicationRouter.get("/", async (req, res) => {
  try {
    const applicationdata = await Application.find();

    res.status(200).send(applicationdata);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
}

);

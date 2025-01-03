import { Request, Response } from "express";
import { launches } from "../services/launches-service";

export const getAllLaunches = (req: Request, res: Response) => {
  return res.status(200).json(Array.from(launches.values()));
};

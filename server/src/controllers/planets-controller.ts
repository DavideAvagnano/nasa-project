import { Request, Response } from "express";
import { habitablePlanet as planets } from "../services/planets-service";

export const getAllPlanets = (req: Request, res: Response) => {
  return res.status(200).json(planets);
};

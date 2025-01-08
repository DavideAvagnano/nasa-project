import express from "express";
import { getAllPlanets } from "../services/planets";

export const httpGetAllPlanets = (
  req: express.Request,
  res: express.Response
) => {
  return res.status(200).json(getAllPlanets());
};

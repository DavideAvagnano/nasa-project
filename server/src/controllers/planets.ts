import express from "express";
import { getAllPlanetsNames } from "../models/planet";

export const httpGetAllPlanets = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const planetsNames = await getAllPlanetsNames();
    return res.status(200).json(planetsNames);
  } catch (error) {
    console.error("Error fetching planets", error);
    return res.status(500).json({ error: "Failed to fetch planets" });
  }
};

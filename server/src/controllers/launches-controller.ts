import express from "express";
import { addNewLaunch, getAllLaunches } from "../services/launches-service";
import { Launch } from "../models/launch-model";

export const httpGetAllLaunches = (
  req: express.Request,
  res: express.Response
) => {
  const launches: Launch[] = getAllLaunches();
  return res.status(200).json(launches);
};

export const httpAddNewLaunch = (
  req: express.Request,
  res: express.Response
) => {
  const launch: Launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate.valueOf())) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
};

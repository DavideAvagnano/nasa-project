import express from "express";
import {
  abortLaunchById,
  addNewLaunch,
  existsLaunchWithId,
  getAllLaunches,
} from "../services/launches-service";
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
    !launch.target
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

export const httpAbortLaunch = (
  req: express.Request,
  res: express.Response
) => {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "launch not found" });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
};

import express from "express";
import {
  abortLaunchById1,
  addNewLaunch,
  existsLaunchWithId,
  getAllLaunches,
} from "../services/launches";
import { Launch1 as Launch } from "../models/launch";

// GET /api/launches
export const httpGetAllLaunches = async (
  req: express.Request,
  res: express.Response
) => {
  const launches = await getAllLaunches();
  return res.status(200).json(launches);
};

// POST /api/launches
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

// DELETE /api/launches/:id
export const httpAbortLaunch = (
  req: express.Request,
  res: express.Response
) => {
  const launchId = Number(req.params.id);
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "launch not found" });
  }
  const aborted = abortLaunchById1(launchId);
  return res.status(200).json(aborted);
};

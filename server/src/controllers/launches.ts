import express from "express";
import {
  getAllLaunches,
  getLaunchByFlightNumber,
  Launch,
} from "../models/launch";
import {
  abortLaunchByFlightNumber,
  scheduleNewLaunch,
} from "../services/launches";

// GET /api/launches
export const httpGetAllLaunches = async (
  req: express.Request,
  res: express.Response
) => {
  const launches = await getAllLaunches();
  return res.status(200).json(launches);
};

// POST /api/launches
export const httpAddNewLaunch = async (
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

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

// DELETE /api/launches/:flightNumber
export const httpAbortLaunch = async (
  req: express.Request,
  res: express.Response
) => {
  const flightNumber = Number(req.params.id);

  const existLaunch = await getLaunchByFlightNumber(flightNumber);

  if (!existLaunch) {
    return res.status(404).json({ error: "launch not found" });
  }

  const isAborted = await abortLaunchByFlightNumber(flightNumber);

  if (!isAborted) {
    return res.status(400).json({ error: "Failed to abort the launch" });
  }
  return res.status(200).json({ message: "Launch aborted successfully" });
};

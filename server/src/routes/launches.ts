import express from "express";
import {
  httpAbortLaunch,
  httpAddNewLaunch,
  httpGetAllLaunches,
} from "../controllers/launches";

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

export default launchesRouter;

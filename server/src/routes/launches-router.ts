import { Router } from "express";
import {
  httpAddNewLaunch,
  httpGetAllLaunches,
} from "../controllers/launches-controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

export default launchesRouter;

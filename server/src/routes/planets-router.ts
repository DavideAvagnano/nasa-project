import express from "express";
import { httpGetAllPlanets } from "../controllers/planets-controller";

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);

export default planetsRouter;

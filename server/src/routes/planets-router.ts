import { Router } from "express";
import { httpGetAllPlanets } from "../controllers/planets-controller";

const planetsRouter = Router();

planetsRouter.get("/", httpGetAllPlanets);

export default planetsRouter;

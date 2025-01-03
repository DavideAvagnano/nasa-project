import { Router } from "express";
import { getAllPlanets } from "../controllers/planets-controller";

const planetsRouter = Router();

planetsRouter.get("/planets", getAllPlanets);

export default planetsRouter;

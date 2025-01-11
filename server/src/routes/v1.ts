import express from "express";
import planetsRouter from "./planets";
import launchesRouter from "./launches";

const v1Router = express.Router();

v1Router.use("/api/planets", planetsRouter);
v1Router.use("/api/launches", launchesRouter);

export default v1Router;

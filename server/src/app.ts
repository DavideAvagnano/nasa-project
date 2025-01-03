import express from "express";
import cors from "cors";

import planetsRouter from "./routes/planets-router";

export const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// ROUTES
app.use("/", planetsRouter);

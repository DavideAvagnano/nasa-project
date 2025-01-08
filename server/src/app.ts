import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import planetsRouter from "./routes/planets";
import launchesRouter from "./routes/launches";

export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

// ROUTES
app.use("/api/planets", planetsRouter);
app.use("/api/launches", launchesRouter);

// SPA fallback
app.get("/*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

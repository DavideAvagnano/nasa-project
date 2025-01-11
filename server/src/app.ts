import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import v1Router from "./routes/v1";

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
app.use("/v1", v1Router);

// SPA fallback
app.get("/*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
